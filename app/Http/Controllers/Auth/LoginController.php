<?php
/**
 * @copyright 2018 Manfred047
 * @author Emanuel Chablé Concepción <manfred@manfred047.com>
 * @version 1.0.0
 * @website: https://manfred047.com
 * @github https://github.com/Manfred047
 */

namespace App\Http\Controllers\Auth;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Library\Master;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Laravel\Passport\Http\Controllers\AccessTokenController;
use Psr\Http\Message\ServerRequestInterface;

class LoginController extends AccessTokenController
{
    /**
     * Session start
     *
     * @param LoginRequest $request
     * @param ServerRequestInterface $server
     * @return \Illuminate\Http\Response
     */
    public function login(LoginRequest $request, ServerRequestInterface $server)
    {
        $tokenResponse = parent::issueToken($server);
        $content = $tokenResponse->getContent();
        $data = json_decode($content, true);
        if(isset($data["error"])) {
            return response()->json([
                'message' => 'invalid_credentials',
                'errors' => [
                    'username' => ['Incorrect username or password'],
                    'password' => ['Incorrect username or password']
                ]
            ], 422);
        }
        if (isset($data['access_token'])) {
            return Master::success()
                ->cookie('oauth', $data['access_token'], Master::passportCookieLifetime());
        }
        return $tokenResponse;
    }

    /**
     * Check login (you can add more login validations)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function check(Request $request)
    {
        $info = [
            'auth' => auth('api')->check(),
            'data' => []
        ];
        if ($request->filled('details') && $request->get('details') === '1') {
            if ($info['auth']) {
                $user = User::findOrFail($request->user('api')->id);
                $info['data'] = UserResource::make($user);
                return response()->json($info);
            }
            return response()->json($info);
        }
        return response()->json($info);
    }

    /**
     * Logout
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function logout(Request $request)
    {
        $accessToken = $request->user()->token();
        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->delete();
        $accessToken->delete();
        cookie()->forget('oauth');
        return Master::success();
    }

}

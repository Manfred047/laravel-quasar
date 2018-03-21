<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\LoginRequest;
use App\Library\Master;
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
                'error' => 'invalid_credentials',
                'errors' => [
                    'username' => ['Incorrect username or password'],
                    'password' => ['Incorrect username or password']
                ]
            ], 422);
        }
        if (isset($data['access_token'])) {
            return response()->json(['success' => 'ok'])
                ->cookie('oauth', $data['access_token'], Master::passportCookieLifetime());
        }
        return $tokenResponse;
    }

    /**
     * Check login (you can add more login validations)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function check()
    {
        return response()->json(['auth' => auth()->check()]);
    }

    /**
     * Logout
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function logout()
    {
        $accessToken = auth()->user()->token();
        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);
        $accessToken->revoke();
        cookie()->forget('oauth');
        return response()->json(['success' => 'ok']);
    }

    /**
     * Delete all user access tokens
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function revokeUserTokens()
    {
        $userTokens = auth()->user()->tokens()->get();
        foreach($userTokens as $index=> $token) {
            DB::table('oauth_refresh_tokens')
                ->where('access_token_id', $token->id)
                ->update([
                    'revoked' => true
                ]);
            $token->revoke();
        }
        cookie()->forget('oauth');
        return response()->json(['success' => 'ok']);
    }
}

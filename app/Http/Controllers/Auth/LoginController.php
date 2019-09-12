<?php

namespace App\Http\Controllers\Auth;

use App\Http\Resources\User\UserResource;
use App\Library\Master;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Psr\Http\Message\ServerRequestInterface;

class LoginController extends AccessTokenController
{
    public function login(Request $request, ServerRequestInterface $server)
    {
        validator($request->all(), User::loginRules())
            ->validate();
        $tokenResponse = parent::issueToken($server);
        $content = $tokenResponse->getContent();
        $data = json_decode($content, true);
        if(isset($data["error"])) {
            return response()->json([
                'error' => 'invalid_credentials',
                'message' => 'The user credentials were incorrect.',
                'errors' => [
                    'username' => ['Incorrect username or password'],
                    'password' => ['Incorrect username or password']
                ]
            ], 401);
        }
        if (isset($data['access_token'])) {
            $user = new User();
            $data['user_data'] = UserResource::make($user->findForPassport($request->input('username')));
            return $tokenResponse->setContent($data);
        }
        return $tokenResponse;
    }

    public function logout(Request $request)
    {
        $accessToken = $request->user()->token();
        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->delete();
        $accessToken->delete();
        return Master::successResponse();
    }
}

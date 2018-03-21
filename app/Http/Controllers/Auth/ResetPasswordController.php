<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordRequest;
use App\PasswordReset;
use App\User;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ResetPasswordController extends Controller
{

    public function store(PasswordRequest $request)
    {
        // Get token data
        $password = PasswordReset::where([
            ['email', $request->email],
            ['token', $request->token]
        ])->firstOrFail();
        // Get user data, then update user
        $user = User::findOrFail($password->user_id);
        $user->password = $request->password;
        $user->remember_token = null;
        $user->saveOrFail();
        $this->revokeAllUserTokens($user);
        // disable token
        $password->token = null;
        $password->save();
        // response
        return response()->json(['success' => 'ok']);
    }

    public function revokeAllUserTokens($user)
    {
        $userTokens = $user->tokens()->get();
        foreach($userTokens as $index=> $token) {
            DB::table('oauth_refresh_tokens')
                ->where('access_token_id', $token->id)
                ->update([
                    'revoked' => true
                ]);
            $token->revoke();
        }
    }

}

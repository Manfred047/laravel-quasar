<?php
/**
 * @copyright 2018 Manfred047
 * @author Emanuel Chablé Concepción <manfred@manfred047.com>
 * @version 1.0.0
 * @website: https://manfred047.com
 * @github https://github.com/Manfred047
 */

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordRequest;
use App\Library\Master;
use App\PasswordReset;
use App\User;

class ResetPasswordController extends Controller
{

    /**
     * Regenerate user password
     *
     * @param PasswordRequest $request
     * @return mixed
     */
    public function store(PasswordRequest $request)
    {
        // Get token data
        $password = PasswordReset::where([
            ['email', $request->get('email')],
            ['token', $request->get('token')]
        ])->firstOrFail();
        // Get user data, then update user
        $user = User::findOrFail($password->user_id);
        $user->password = $request->get('password');
        $user->remember_token = null;
        $user->saveOrFail();
        // disable token
        $password->token = null;
        $password->save();
        // Revoke all tokens
        return Master::revokeAllUserTokens($user, true);
    }

}

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
use App\Http\Requests\RecoveryRequest;
use App\Library\Master;
use App\Mail\Recovery;
use App\PasswordReset;
use App\User;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Support\Facades\Mail;

class ForgotPasswordController extends Controller
{

    public function store(RecoveryRequest $request)
    {
        // Get user data
        $user = User::where('email', $request->email)
            ->firstOrFail();
        // Generate secure token
        $token = str_random(20);
        // Store recovery info
        $reset = new PasswordReset();
        $reset->email = $user->email;
        $reset->user_id = $user->id;
        $reset->token = $token;
        $reset->saveOrFail();
        // Send email
        $data = (object) [
            'username' => $user->username,
            'email' => $user->email,
            'token' => $token
        ];
        Mail::to($user->email)
            ->send(new Recovery($data));
        // Response
        return Master::success();
    }

}

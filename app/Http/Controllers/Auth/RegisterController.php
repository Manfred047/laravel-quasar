<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\RegisterRequest;
use App\Library\Master;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    public function store(RegisterRequest $request)
    {
        $user = new User();
        $user->email = $request->email;
        $user->username = $request->username;
        $user->password = $request->password;
        $user->saveOrFail();
        $response = $this->autoLogin($request);
        if ($response->getStatusCode() === 200) {
            return $response;
        }
        return response()->json(['success' => 'warning']);
    }

    public function autoLogin(Request $request)
    {
        $data = [
            'username' => $request->email,
            'password' => $request->password,
            'grant_type' => 'password'
        ];
        return Master::request(route('auth.login'), 'post', $data);
    }

}

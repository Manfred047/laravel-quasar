<?php
/**
 * @copyright 2018 Manfred047
 * @author Emanuel Chablé Concepción <manfred@manfred047.com>
 * @version 1.0.0
 * @website: https://manfred047.com
 * @github https://github.com/Manfred047
 */

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
        $user->email = $request->get('email');
        $user->username = $request->get('username');
        $user->password = $request->get('password');
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
            'username' => $request->get('email'),
            'password' => $request->get('password'),
            'grant_type' => 'password'
        ];
        return Master::request(route('api.auth.login'), 'post', $data);
    }

}

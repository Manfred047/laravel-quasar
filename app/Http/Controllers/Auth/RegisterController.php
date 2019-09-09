<?php

namespace App\Http\Controllers\Auth;

use App\Library\Master;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function store(Request $request)
    {
        $this->validate($request, User::registerRules());
        try {
            $user = new User();
            $user->fill($request->only(['name', 'email', 'username', 'password']));
            $user->saveOrFail();
            return Master::successResponse();
        } catch (\Throwable $ex) {
            if (Master::hasDebug()) {
                return Master::exceptionResponse($ex, 'register');
            }
        }
        return Master::errorResponse('register');
    }
}

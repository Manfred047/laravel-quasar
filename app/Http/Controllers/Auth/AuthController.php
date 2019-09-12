<?php

namespace App\Http\Controllers\Auth;

use App\Services\UserService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    private $user_service;

    public function __construct(Request $request)
    {
        $this->user_service = new UserService($request);
    }

    public function index()
    {
        return $this->user_service->getAuthUserData();
    }
}

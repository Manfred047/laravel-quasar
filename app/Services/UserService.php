<?php

namespace App\Services;

use App\Http\Resources\User\UserResource;
use Illuminate\Http\Request;

class UserService
{
    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function getAuthUserData()
    {
        return UserResource::make($this->request->user());
    }
}

<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Validators\MasterValidator;
use Illuminate\Support\Facades\Validator;

class ValidatorServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Validator::resolver(function($translator, $data, $rules, $messages)
        {
            return new MasterValidator($translator, $data, $rules, $messages);
        });
    }

    public function register()
    {
        // @todo
    }
}
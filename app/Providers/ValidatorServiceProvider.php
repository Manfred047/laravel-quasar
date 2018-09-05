<?php
/**
 * @copyright 2018 Manfred047
 * @author Emanuel Chablé Concepción <manfred@manfred047.com>
 * @version 1.0.0
 * @website: https://manfred047.com
 * @github https://github.com/Manfred047
 */

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

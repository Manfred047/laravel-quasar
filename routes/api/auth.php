<?php
/**
 * @copyright 2018 Manfred047
 * @author Emanuel Chablé Concepción <manfred@manfred047.com>
 * @version 1.0.0
 * @website: https://manfred047.com
 * @github https://github.com/Manfred047
 */

/**
 * Auth routes
 * @todo Auth Routes
 */
Route::name('api.auth.')
    ->prefix('/v1')
    ->namespace('Auth')
    ->group(function () {

        Route::post('/oauth/token', 'LoginController@login')
            ->middleware(['oauth.grant:password', 'oauth.details'])
            ->name('login');

        Route::apiResource('/recovery', 'ForgotPasswordController')
            ->only('store');

        Route::apiResource('/reset-password', 'ResetPasswordController')
            ->only('store');

        Route::apiResource('/register', 'RegisterController')
            ->only('store');

        Route::post('/oauth/logout', 'LoginController@logout')
            ->middleware(['auth:api'])
            ->name('logout');

        Route::apiResource('/oauth/change-password', 'ChangePasswordController')
            ->middleware(['auth:api'])
            ->only('store');
    });

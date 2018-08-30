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
 * Aqui se encuentran las rutas para login, cierre de sesion, registro y recovery (password)
 */
Route::name('api.auth.')
    ->prefix('/v1')
    ->namespace('Auth')
    ->group(function () {

        Route::post('/oauth/token', 'LoginController@login')
            ->middleware(['client.grants:password', 'client.details'])
            ->name('login');

        Route::get('/oauth/check', 'LoginController@check')
            ->middleware('client.oauth')
            ->name('check');

        Route::apiResource('/recovery', 'ForgotPasswordController')
            ->only('store');

        // Update password (by recovery).
        Route::apiResource('/new-password', 'ResetPasswordController')
            ->only('store');

        // New user (by register)
        Route::apiResource('/register', 'RegisterController')
            ->only('store');

        // Cerrar sesion
        Route::post('/oauth/logout', 'LoginController@logout')
            ->middleware(['client.oauth', 'auth:api'])
            ->name('logout');

    });
<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => '/v1',
], function () {

    Route::post('/oauth/token', 'Auth\LoginController@login')
        ->middleware(['client.grants:password', 'client.details'])
        ->name('auth.login');

    Route::get('/oauth/check', 'Auth\LoginController@check')
        ->middleware('client.oauth');

    Route::resource('/recovery', 'Auth\ForgotPasswordController')
        ->only('store');

    // Update password (by recovery).
    Route::resource('/new-password', 'Auth\ResetPasswordController')
        ->only('store');

    // New user (by register)
    Route::resource('/register', 'Auth\RegisterController')
        ->only('store');

    Route::group([
        'middleware' => ['client.oauth', 'auth:api']
    ], function () {

        Route::post('/oauth/logout', 'Auth\LoginController@logout')
            ->name('auth.logout');

        Route::post('/oauth/revoke', 'Auth\LoginController@revokeUserTokens')
            ->name('auth.revoke');

        Route::resource('user', 'UserController')
            ->only('index');

    });

});

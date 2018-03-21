<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\RegisterRequest;
use App\User;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use GuzzleHttp\Exception\ClientException;

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
        $eval = $this->autoLogin($request);
        if ($eval) {
            return $eval;
        }
        return response()->json(['success' => 'warning']);
    }

    public function autoLogin($data)
    {
        try{
            $client = new Client([
                'base_uri' => env('API_URL'),
                'cookies' => true
            ]);
            $request = $client->post('/oauth/token', [
                'headers' => ['X-Requested-With' => 'XMLHttpRequest'],
                'form_params' => [
                    'username' => $data->username,
                    'password' => $data->password,
                    'grant_type' => 'password'
                ],
            ]);
            $eval = json_decode($request->getBody()->getContents(), true);
            if (isset($eval['success'])) {
                return $request;
            }
        }catch (ClientException $ex) {
            return $ex->getMessage();
        }catch (BadResponseException $ex) {
            return $ex->getMessage();
        }
        return false;
    }

}

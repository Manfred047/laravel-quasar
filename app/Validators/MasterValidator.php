<?php

namespace App\Validators;

use GuzzleHttp\Client;

class MasterValidator extends \Illuminate\Validation\Validator
{

    /**
     * Validate Google ReCaptcha
     *
     * @param $attribute
     * @param $value
     * @param $parameters
     * @param $validator
     * @return mixed
     */
    public function validateRecaptcha($attribute, $value, $parameters, $validator)
    {
        $client = new Client();
        $response = $client->post('https://www.google.com/recaptcha/api/siteverify',
            [
                'form_params' => [
                    'secret'   => env('GOOGLE_RECAPTCHA_PRIVATE_KEY'),
                    'response' => $value
                ]
            ]);
        $body = json_decode(
            (string) $response->getBody()
        );
        return $body->success;
    }

}
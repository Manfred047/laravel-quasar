<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->ajax();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|email|max:50|confirmed|unique:users',
            'username' => 'required|alpha_num|max:50|unique:users',
            'password' => 'required|confirmed|min:8|regex:/(^[\S]{8,}$)/'
        ];
    }
}

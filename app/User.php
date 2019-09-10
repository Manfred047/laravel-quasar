<?php

namespace App;

use App\Library\Master;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'username' ,'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'username' => 'string',
        'email' => 'string',
        'password' => 'string',
        'email_verified_at' => 'datetime',
    ];

    // METHODS

    public function findForPassport($username) {
        return $this->where('email', $username)
            ->orWhere('username', $username)
            ->first();
    }

    // SETTERS

    public function setUserNameAttribute($username)
    {
        $this->attributes['username'] = Master::trimmed($username, true);
    }

    public function setEmailAttribute($email)
    {
        $this->attributes['email'] = mb_strtolower($email, 'UTF-8');
    }

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    // RULES
    public static function registerRules()
    {
        return [
            'email' => 'required|string|email|max:50|confirmed|unique:users',
            'username' => 'required|string|alpha_num|max:50|unique:users',
            'password' => 'required|string|confirmed|min:8|regex:/(^[\S]{8,}$)/'
        ];
    }

    public static function loginRules()
    {
        return [
            'username' => 'required|string|max:50',
            'password' => 'required|string|min:8',
            'grant_type' => 'required|string|in:password'
        ];
    }
}

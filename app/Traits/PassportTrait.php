<?php
/**
 * @copyright 2018 Manfred047
 * @author Emanuel Chablé Concepción <manfred@manfred047.com>
 * @version 1.0.0
 * @website: https://manfred047.com
 * @github https://github.com/Manfred047
 */

namespace App\Traits;

trait PassportTrait
{
    public static function passportCookieLifetime()
    {
        return now()
            ->addDays(env('TOKEN_LIFE_TIME', 365))
            ->diffInMinutes();
    }

    public static function getPassportCookieName()
    {
        return env('AUTH_COOKIE_NAME', 'lq-oauth');
    }

    public static function PassportTokenLifetime()
    {
        return now()
            ->addDays(env('TOKEN_LIFE_TIME', 365));
    }

    public static function PassportRefreshTokenLifetime()
    {
        return now()
            ->addDays(env('TOKEN_LIFE_TIME', 365) * 2);
    }
}

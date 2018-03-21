<?php

namespace App\Traits;

trait LoginTrait
{
    public static $PassportDays = 30;
    /**
     * Set session cookie expiration
     *
     * @return int
     */
    public static function passportCookieLifetime()
    {
        return now()->addDays(self::$PassportDays)->diffInMinutes();
    }

    public static function PassportTokenLifetime()
    {
        return now()->addDays(self::$PassportDays);
    }

    public static function PassportRefreshTokenLifetime()
    {
        return now()->addDays(self::$PassportDays * 2);
    }

}
<?php
/**
 * @copyright 2018 Manfred047
 * @author Emanuel Chablé Concepción <manfred@manfred047.com>
 * @version 1.0.0
 * @website: https://manfred047.com
 * @github https://github.com/Manfred047
 */

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
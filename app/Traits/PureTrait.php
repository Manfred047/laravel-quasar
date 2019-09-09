<?php
/**
 * @copyright 2018 Manfred047
 * @author Emanuel Chablé Concepción <manfred@manfred047.com>
 * @version 1.0.0
 * @website: https://manfred047.com
 * @github https://github.com/Manfred047
 */

namespace App\Traits;

trait PureTrait
{
    /**
     * Sanitize variables (prevent XSS)
     *
     * @param string $data - Insecure data
     * @return string
     */
    public static function sanitize($data)
    {
        if($data !== '' && $data !== null) {
            $data = self::trimmed($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
            return $data;
        }
        return '';
    }

    /**
     * Removes all white spaces except one
     *
     * Example: foo    bar = foo bar
     *
     * @param string $data
     * @param boolean $save - If the function cant return null value
     * @return string|null
     */
    public static function trimmed($data, $save = false)
    {
        if($data !== '' && $data !== null) {
            return trim(preg_replace_callback('/(\s\s+)/u', function($data){ return ' ';}, $data));
        }
        return (($save) ? null : '');
    }
}

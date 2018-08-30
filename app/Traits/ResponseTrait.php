<?php
/**
 * @copyright 2018 Manfred047
 * @author Emanuel Chablé Concepción <manfred@manfred047.com>
 * @version 1.0.0
 * @website: https://manfred047.com
 * @github https://github.com/Manfred047
 */

namespace App\Traits;

trait ResponseTrait
{

    public static function success()
    {
        return response()->json([
            'message' => 'success'
        ]);
    }

    public static function error($module = '', $error = 'create', $code = 409)
    {
        return response()->json([
            'message' => "Can't {$error} {$module}",
            'error' => self::errorType($error)
        ], $code);
    }

    public static function errorType($error)
    {
        switch ($error) {
            case 'create':
                return 'not_be_created';
            case 'update':
                return 'not_be_updated';
            case 'delete':
                return 'not_be_deleted';
            default:
                return 'Unknown';
        }
    }
}
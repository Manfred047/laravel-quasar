<?php
/**
 * @copyright 2018 Manfred047
 * @author Emanuel Chablé Concepción <manfred@manfred047.com>
 * @version 1.0.0
 * @website: https://manfred047.com
 * @github https://github.com/Manfred047
 */

namespace App\Exceptions;

use Exception;

class MethodTypeException extends Exception
{
    /**
     * Report the exception.
     *
     * @return void
     */
    public function report()
    {
        //
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function render($request)
    {
        return response()->json([
            'error' => 'method_not_allowed',
            'code' => 405,
            'hint' => 'Method Not Allowed',
            'message' => "The method {$request->getMethod()} is not allowed.",
        ], 405);
    }
}

<?php

namespace App\Traits;

use Illuminate\Http\Request;

/**
 *
 * @author Manfred047 <github.com/manfred047>
 * Trait RequestTrait
 * @package App\Traits
 */
trait RequestTrait
{
    /**
     * Creates an internal request
     *
     * @param $uri
     * @param string $method
     * @param array $parameters
     * @param array $cookies
     * @param array $files
     * @param array $server
     * @param null $content
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public static function request($uri, $method = 'GET', $parameters = [], $cookies = [], $files = [], $server = [], $content = null)
    {
        $server = array_replace([
            'HTTP_X_REQUESTED_WITH' => 'XMLHttpRequest',
            'HTTP_ACCEPT' => 'application/json'
        ], $server);
        $tokenRequest = Request::create(
            $uri,
            $method,
            $parameters,
            $cookies,
            $files,
            $server,
            $content
        );
        return app()->handle($tokenRequest);
    }
}
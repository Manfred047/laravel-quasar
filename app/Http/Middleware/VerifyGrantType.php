<?php
/**
 * @copyright 2018 Manfred047
 * @author Emanuel Chablé Concepción <manfred@manfred047.com>
 * @version 1.0.0
 * @website: https://manfred047.com
 * @github https://github.com/Manfred047
 */

namespace App\Http\Middleware;

use App\Exceptions\GrantTypeException;
use Closure;

class VerifyGrantType
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @param $grants
     * @return mixed
     * @throws \Throwable
     */
    public function handle($request, Closure $next, $grants)
    {
        $acceptedGrants = explode('|', $grants);
        // Lets verify we can only access this when the grant_type is accepted
        throw_if(!in_array($request->input('grant_type'), $acceptedGrants), GrantTypeException::class);
        return $next($request);
    }
}

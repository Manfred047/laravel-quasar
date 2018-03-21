<?php

namespace App\Http\Middleware;

use Closure;

class VerifyGrantType
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $grants)
    {
        $acceptedGrants = explode('|', $grants);

        // Lets verify we can only access this when the grant_type is accepted
        if(!in_array($request->grant_type, $acceptedGrants)){
            return response()->json([
                'error' => 'unsupported_grant',
                'hint' => 'Check the grant type',
                'message' => "{$request->grant_type} grant is not supported."
            ], 400);
        }
        return $next($request);
    }
}

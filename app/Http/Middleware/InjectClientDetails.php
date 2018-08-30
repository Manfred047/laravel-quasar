<?php
/**
 * @copyright 2018 Manfred047
 * @author Emanuel Chablé Concepción <manfred@manfred047.com>
 * @version 1.0.0
 * @website: https://manfred047.com
 * @github https://github.com/Manfred047
 */

namespace App\Http\Middleware;

use Closure;

class InjectClientDetails
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        with(new \Dotenv\Dotenv(base_path()))->load();
        $request->request->add([
            'client_id' => env('PASSWORD_CLIENT_ID', ''),
            'client_secret' => env('PASSWORD_CLIENT_SECRET', '')
        ]);
        return $next($request);
    }
}

<?php

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

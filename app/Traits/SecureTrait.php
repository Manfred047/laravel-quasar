<?php
/**
 * @copyright 2018 Manfred047
 * @author Emanuel Chablé Concepción <manfred@manfred047.com>
 * @version 1.0.0
 * @website: https://manfred047.com
 * @github https://github.com/Manfred047
 */

namespace App\Traits;

use App\Library\Master;
use App\User;
use Illuminate\Support\Facades\DB;

trait SecureTrait
{
    /**
     * Genera un hash con un salt preestablecido
     *
     * @param string $data
     * @return string
     */
    public static function getHash($data)
    {
        $salt = hex2bin('ccfaa03ca9cfb496d6dc238bb1b8e6ee9cef17ae5c4ec847573e52fa35a74d9c');
        $data = "{$salt}{$data}";
        return base64_encode(hash('sha512', $data));
    }

    /**
     * Genera un token.
     * Devuelve una cadena ASCII que contiene la representación hexadecimal.
     *
     * @param int $ev
     * @return string
     */
    public static function token($ev = 32)
    {
        try {
            return bin2hex(random_bytes($ev));
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * @param $id
     * @param $password
     * @param $response
     * @return bool|\Illuminate\Http\JsonResponse
     */
    public static function changePassword($id, $password, $response = false)
    {
        $user = User::findOrFail($id);
        $user->password = $password;
        $user->remember_token = null;
        $user->saveOrFail();
        return self::revokeAllUserTokens($user, $response);
    }

    /**
     * Elimina todos los tokens de acceso del usuario
     *
     * @param User $user
     * @param bool $response
     * @return bool|\Illuminate\Http\JsonResponse
     */
    public static function revokeAllUserTokens(User $user, $response = false)
    {
        $userTokens = $user->tokens()->pluck('id');

        DB::table('oauth_refresh_tokens')
            ->whereIn('access_token_id', $userTokens)
            ->delete();

        DB::table('oauth_access_tokens')
            ->whereIn('id', $userTokens)
            ->delete();

        if ($response) {
            cookie()->forget('oauth');
            return Master::success();
        }

        return true;
    }

}

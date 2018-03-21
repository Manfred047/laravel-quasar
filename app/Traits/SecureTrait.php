<?php

namespace App\Traits;

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
        return bin2hex(random_bytes($ev));
    }

    /**
     * Genera un hash para compatibilidad de claves almacenadas en Solara
     *
     * @param $data
     * @return string
     */
    public static function solaraHash($data)
    {
        $data = hash('sha256', $data, false);
        $data = base64_encode($data);
        return $data;
    }
}
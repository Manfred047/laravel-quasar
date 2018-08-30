<?php
/**
 * @copyright 2018 Manfred047
 * @author Emanuel Chablé Concepción <manfred@manfred047.com>
 * @version 1.0.0
 * @website: https://manfred047.com
 * @github https://github.com/Manfred047
 */

namespace App\Traits;

trait DirScriptMapTrait
{

    public static function scriptMap()
    {
        $path = storage_path()."/json/dir-script-map.json";
        $data = json_decode(file_get_contents($path), true);
        array_walk_recursive($data, function (&$item) {
            $item = str_replace('public/', '', $item);
        });
        return json_decode(json_encode($data));
    }

    public static function getScriptMap()
    {
        $map = self::scriptMap();
        return (app()->isLocal() ? $map->dev : $map->prod);
    }

}
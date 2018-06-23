<?php

namespace App\Library;

use App\Traits\DirScriptMapTrait;
use App\Traits\LoginTrait;
use App\Traits\PureTrait;
use App\Traits\RequestTrait;
use App\Traits\SecureTrait;

/**
 *
 * @author Manfred047 <github.com/manfred047>
 * @email manfred@manfred047.com
 * Class Master
 * @package App\Library
 */

class Master
{
    use PureTrait,
        RequestTrait,
        LoginTrait,
        DirScriptMapTrait,
        SecureTrait;

    protected static $_instance = null;

    /**
     * Prevent direct object creation
     */
    final private function  __construct() { }

    /**
     * Prevent object cloning
     */
    final private function  __clone() { }

    /**
     * Returns new or existing Singleton instance
     * @return Master
     */
    final public static function getInstance()
    {
        if (null !== static::$_instance) {
            return static::$_instance;
        }
        static::$_instance = new static();
        return static::$_instance;
    }

}
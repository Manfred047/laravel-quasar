# By Manfred047
## [Website](https://laravel-quasar.manfred047.com/)

## Español
Ejecuta los siguientes comandos:

1. npm install
2. composer install
3. cp .env.example .env
4. php artisan key:generate
5. php artisan migrate
6. php artisan passport:install

Copia los tokens generados (Password grant client) y agrega/actualiza las siguientes llaves en tu archivo .env:\
 PASSWORD_CLIENT_ID \
 PASSWORD_CLIENT_SECRET

Ejecuta:\
npm run watch\
php artisan serve

y ahora puedes abrir en tu navegador: http://127.0.0.1:8000

 ## Estructura del JS
 #### Plugins (Como Vue plugins o plugins propios)
 ##### Incluye la configuración de Quasar.
 
 + Manejador de plugins: "plugins.js" en "resources/js/plugins/plugins.js".
 
 #### Componentes (Puedes registrar componentes globales)
 
 + Manejador de componentes: "components.js" en "resources/js/components/components.js"
 
 #### Directivas (directivas de Vue)
 
 * Manejador de directivas: "directives.js" en "resources/js/directives/directives.js"
 
 #### Filtros (Filtros de Vue)
 
 + Manejador de filtros: "filter.js" en "resources/js/filters/filters.js"
 
 #### Lenguages (Para Vue language)
 ##### Puedes agregar o editar nuevos lenguages en el directorio "locale"
 
 * Manejador de idiomas: "i18n.js" en "resources/js/lang/i18n.js"
 
 #### Rutas (Vue router)
 
 * Manejador de rutas: "router.js" en "resources/js/routes/router.js"

##### El Router incluye al auth manager

* Manejador de auth: "auth-manager.js" en "router path".

##### Archivos asincronos (por ejemplo, componentes)
* Manejador de componentes asincronos (para el router): "external-files.js" en "resources/js/routes/external-import/external-files.js"

#### Vuex
##### Puedes usar Vuex

* Manejador de vuex: "store.js" en "resources/js/store/store.js"

##### Puedes agregar o editar modulos de vuex

* Directorio de modulos: "resources/js/store/modules"

#### Manejador de la App
##### Nucleo de vue (Incluye todas las configuraciones)

* Nucleo: "App.js" en "resources/js/app.js"

 ## Estructura del CSS
 #### SASS
 
 * Para variables personalizadas: "_variables.scss" en "resources/sass/_variables.scss"
 
 * Para plugins o diseño: "app.scss" en "resources/sass/app.scss"
 
 #### STYLUS
 ##### Este directorio contiene el Stylus de Quasar
 
 * Quasar Stylus: "main.styl" en "resources/stylus/main.styl"

#### Directorio de modelos (temas)
##### Puedes guardar imagenes u otros complementos en este directorio

* Directorio de modelos: "resources/template"

#### Manejador de mapa de scripts
##### Este archivo contiene las ubicaciones de cada script (js/css).

* Manejador de mapa de scripts: "dir-script-map.js" en "storage/json/dir-script-map.json"

##### Laravel lee este archivo en un trait

* Laravel script trait: "DirScriptTrait.php" en "Traits/DirScriptMapTrait.php"

#### Webpack

* Webpack config: "webpack.mix.js" en "webpack.mix.js" (Directorio raiz)

#### Libreria Maestra para Laravel
##### Esta es una libreria de tipo Singleton static class
##### Incluye todos los Traits, esta libreria se integra a las librerias globales de Laravel  (Se carga solo cuando se necesita).

* Libreria maestra: "Master.php" en "App/Library/Master.php"

#### Validador maestro (Validador de laravel)
##### Puedes agregar tu propio validador y este se registrar de forma global en los validadores de Laravel..

* Validador maestro: "MasterValidator.php" en "App/Validators/MasterValidator.php"

##### No olvides registrar los mensajes de validación en "resources/lang"


#### Middlewares
##### Api middlewares ("App/Http/Middleware").
##### Estos middlewares estan registrados en "App/Http/Kernel.php"

* "InjectAuthToken.php"
* "InjectClientDetails.php"
* "VerifyGrantType.php"
* "VerifyIsAjax.php"

#### Router (Laravel Api)

* Api router: "api.php" en "routes/api.php"

## Importante

* Laravel Api trabaja empleando una cookie, puedes editar el tiempo de expiración de esta en "App/Traits/LoginTrait.php"

#

## English

Execute the following commands:
1. npm install
2. composer install
3. cp .env.example .env
4. php artisan key:generate
5. php artisan migrate
6. php artisan passport:install

Copy the generated tokens (Password grant client) and add/update the following keys in your .env file:\
 PASSWORD_CLIENT_ID \
 PASSWORD_CLIENT_SECRET
 
Execute:\
npm run watch\
php artisan serve

And you should be ready to open: http://127.0.0.1:8000

 ## JS Structure
 #### Plugins (Like Vue plugins or custom plugins)
 ##### Includes Quasar config.
 
 + Plugin manager: "plugins.js" in "resources/js/plugins/plugins.js".
 
 #### Components (You can register a global components)
 
 + Component manager: "components.js" in "resources/js/components/components.js"
 
 #### Directives (Vue directives)
 
 * Directive manager: "directives.js" in "resources/js/directives/directives.js"
 
 #### Filters (Vue filters)
 
 + Filter manager: "filter.js" in "resources/js/filters/filters.js"
 
 #### Language (For Vue lang)
 ##### You can edit or add new languages on "locale folder"
 
 * Language manager: "i18n.js" in "resources/js/lang/i18n.js"
 
 #### Router (Vue router)
 
 * Router manager: "router.js" in "resources/js/routes/router.js"

##### Router includes an auth manager

* Auth manager: "auth-manager.js" in "router path".

##### Async files (Like components)
* Async component manager (for router): "external-files.js" in "resources/js/routes/external-import/external-files.js"

#### Vuex
##### You can use Vuex

* Vuex manager: "store.js" in "resources/js/store/store.js"

##### You can add or edit new modules for vuex

* Module path: "resources/js/store/modules"

#### App manager
##### Vue core (Include all configs)

* Core: "App.js" in "resources/js/app.js"

 ## CSS Structure
 #### SASS
 
 * For custom variables: "_variables.scss" in "resources/sass/_variables.scss"
 
 * For Plugins or template: "app.scss" in "resources/sass/app.scss"
 
 #### STYLUS
 ##### This directory contains Quasar Stylus
 
 * Quasar Stylus: "main.styl" in "resources/stylus/main.styl"

#### Template directory
##### You can save images and other assets

* Template directory: "resources/template"

#### Script map manager
##### This file registers scripts path.

* Script path manager: "dir-script-map.js" in "storage/json/dir-script-map.json"

##### Laravel read this file in trait

* Laravel script trait: "DirScriptTrait.php" in "Traits/DirScriptMapTrait.php"

#### Webpack

* Webpack config: "webpack.mix.js" in "webpack.mix.js" (Root directory)

#### Laravel Master library
##### This Library is a Singleton static class
##### Includes all Traits, these libraries will be automatically added to Laravel Global Library (Lazy load).

* Master Library: "Master.php" in "App/Library/Master.php"

#### Master rules (Laravel validator)
##### You can add custom rules and these will be automatically added to Laravel rules.

* Master Ruler: "MasterValidator.php" in "App/Validators/MasterValidator.php"

##### Don't forget to register a messages validator in "resources/lang"


#### Middlewares
##### Api middlewares ("App/Http/Middleware").
##### These middlewares are registered at "App/Http/Kernel.php"

* "InjectAuthToken.php"
* "InjectClientDetails.php"
* "VerifyGrantType.php"
* "VerifyIsAjax.php"

#### Router (Laravel Api)

* Api router: "api.php" in "routes/api/api.php"

## Important

* Laravel Api works using a Cookie, you can edit cookie expiration time at "App/Traits/LoginTrait.php"
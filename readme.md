# By Manfred047
## [Website](https://laravel-quasar.manfred047.com/)

## Español

## Comandos
En el directorio raiz, ejecuta los siguientes comandos:

1. npm install
2. composer install
3. cp .env.example .env
4. cp .env.quasar.development.example .env.quasar.development
5. cp .env.quasar.development.example .env.quasar.production
6. Crear base de datos y configurarlo en el archivo `.env`
7. php artisan key:generate
8. php artisan migrate
9. php artisan passport:install

Copia los tokens generados (Password grant client) y agrega/actualiza las siguientes llaves en tu archivo .env:\
 `PASSWORD_GRANT_CLIENT_ID` \
 `PASSWORD_GRANT_CLIENT_SECRET`
 
 #### Asumiendo que todo esta configurado
 Comandos de desarrollo (trabajan con el CLI de Quasar).
 1. Modo dev: `npm run-script q-spa-dev`
 2. Compilación (producción): `npm run-script q-spa-build`
 
 #### Importante
 * El CLI de Quasar implementa el ESLint, asegurate de que tu entorno lea el archivo de configuración: `.eslintrc.js`
 * El modo SSR no está probado, solo el modo SPA.
 
 ## Valores de .env
 #### .env (de Laravel)
 1. `SESSION_DOMAIN`: Fija el dominio para las cookies.
 2. `SESSION_SECURE_COOKIE`: Establece si se envian las cookies de forma segura (https).
 3. `LANG_COOKIE_NAME`: Establece el nombre de la cookie de idiomas (se recomienda implementar desde js).
 4. `TOKEN_LIFE_TIME`: Establece el tiempo de vida de los tokens de API.
 
 #### .env.quasar.development | .env.quasar.production (de Quasar)
 1. `API_URL`: Url del api a la cual Axios enviará las peticiones.
 2. `AUTH_TOKEN_NAME`: Nombre de la variable que será almacenada en el storage (contiene el bearer token).
 3. `LANG_COOKIE_NAME`: Nombre de la cookie de idioma (javascript controla esta parte, valores "es, en").

## Configurar v-host
En esta actualización se trabaja con el CLI de Quasar, por lo cual se requiere configurar el v-host de apache

#### Xampp con Windows

1. Abrir "httpd-vhosts.conf" que está en: `"C:\xampp\apache\conf\extra"`
2. Agregar la siguiente información:
```
<VirtualHost *:80>
    ServerAdmin manfred@manfred047.com
    DocumentRoot "C:/xampp/htdocs/laravel-quasar/public"
    ServerName lq-test
    ServerAlias lq.test
</VirtualHost>
```
##### 3. Reiniciar Apache

#### Modificar archivo host en Windows
1. Ejecutar notepad como administrador.
2. Abrir el archivo `hosts`que esta en:
`C:\Windows\System32\drivers\etc`
3. Opcional: en caso de no ver el archivo `hosts` seleccione la opcion `todos los archivos`. 
4. Agregar los siguientes valores y guardar los cambios:
```
# LOCALHOST
127.0.0.1       localhost
::1             localhost

# Laravel Quasar
127.0.0.1       lq.test
::1             lq.test
```

## Documentación de Quasar
+ [Quasar Framework](https://quasar.dev/)

 ## Estructura de Quasar
 
 + Se conserva la estructura para el CLI, las carpetas estan en la raiz con los siguientes nombres:
 `src` y `src-ssr`
 
 # Laravel
 
#### Libreria Maestra para Laravel
##### Esta es una libreria de tipo Singleton static class

* Libreria maestra: "Master.php" en "App/Library/Master.php"

#### Middlewares
##### Api middlewares ("App/Http/Middleware").
##### Estos middlewares estan registrados en "App/Http/Kernel.php"

* "InjectGrantClientDetails.php"
* "VerifyGrantType.php"
* "VerifyAjaxRequest.php"

#### Router (Laravel Api)

* Api router: "api.php" en "routes/api/api.php"
* Mapa de rutas (si maneja archivos individuales) en: "app/Providers/RouteServiceProvider.php"

#

## English

#### Coming soon

# By Manfred047
## [Website](https://laravel-quasar.manfred047.com/)

## Español
Ejecuta los siguientes comandos:

1. npm install
2. composer install
3. cp .env.example .env
4. artisan key:generate
5. php artisan migrate
6. php artisan passport:install

Copia los tokens generados (Password grant client) y agrega/actualiza las siguientes llaves en tu archivo .env:\
 PASSWORD_CLIENT_ID \
 PASSWORD_CLIENT_SECRET

Ejecuta:\
npm run watch\
php artisan serve

y ahora puedes abrir en tu navegador: http://127.0.0.1:8000

## Ingles

Execute the following commands:
1. npm install
2. composer install
3. cp .env.example .env
4. artisan key:generate
5. php artisan migrate
6. php artisan passport:install

Copy the generated tokens (Password grant client) and add/update the following keys in your .env file:\
 PASSWORD_CLIENT_ID \
 PASSWORD_CLIENT_SECRET

Execute:
npm run watch
php artisan serve

And you should be ready to open: http://127.0.0.1:8000
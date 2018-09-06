const mix = require('laravel-mix');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const map = require('./storage/json/dir-script-map');

const dir = ((mix.inProduction()) ? map.prod : map.dev);

if (mix.inProduction()) {
    mix.version();
}

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.babel([
    'resources/js/plugins/secure.js'
], dir.js.secure);

mix.js('resources/js/bootstrap.js', dir.js.bootstrap);
mix.js('resources/js/app.js', dir.js.app);
mix.stylus('resources/stylus/main.styl', dir.css.main);
mix.sass('resources/sass/app.scss', dir.css.app);

mix.copyDirectory('resources/template/img', 'public/img');

mix.webpackConfig({
    output: {
        publicPath: '/',
        chunkFilename: dir.chunks
    },
    plugins: [
        new CleanWebpackPlugin([dir.clean])
    ]
});

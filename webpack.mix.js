let mix = require('laravel-mix');

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
    'resources/assets/js/plugins/secure.js'
], 'public/js/secure.js');

mix.js('resources/assets/js/bootstrap.js', 'public/js');
mix.js('resources/assets/js/app.js', 'public/js');
mix.stylus('resources/assets/stylus/main.styl', 'public/css');
mix.sass('resources/assets/sass/app.scss', 'public/css');

mix.copyDirectory('resources/assets/template/img', 'public/img');

if (mix.inProduction()) {
    mix.version();
} else {
    //mix.sourceMaps();
}

mix.webpackConfig({
    output: {
        publicPath: '/'
    }
});

// Fix for "run hot"
Mix.listen('configReady', (webpackConfig) => {
    if (Mix.isUsing('hmr')) {
        // Remove leading '/' from entry keys
        webpackConfig.entry = Object.keys(webpackConfig.entry).reduce((entries, entry) => {
            entries[entry.replace(/^\//, '')] = webpackConfig.entry[entry];
            return entries;
        }, {});

        // Remove leading '/' from ExtractTextPlugin instances
        webpackConfig.plugins.forEach((plugin) => {
            if (plugin.constructor.name === 'ExtractTextPlugin') {
                plugin.filename = plugin.filename.replace(/^\//, '');
            }
        });
    }
});
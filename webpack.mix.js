let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

 //-- define public folder for mix
mix.setPublicPath('public/dist');



//-- for spa
mix.js('resources/app/js/app.js', 'public/dist/js')
   .vue()
mix.sass('resources/app/sass/app.scss', 'public/dist/css')
   
 
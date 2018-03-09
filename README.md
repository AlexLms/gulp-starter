# Gulp boilerplate [sass, pug, es6]

Fast builder for your static page projects (not SPA).

# Installation

1) Open your console and type:

2) Install gulp dependencies via npm `npm i` or yarn `yarn install`.

3) Install libs you may need (jquery + html5shiv) - `bower i`.

4) Start your web server `gulp`.

5) Write your code.

# Location of stuff

- Your compiled [css files](https://github.com/AlexLasagna/gulp-starter/tree/master/app/css).
- Your compiled [es6 js files](https://github.com/AlexLasagna/gulp-starter/tree/master/app/js).
- Your compiled [html files](https://github.com/AlexLasagna/gulp-starter/tree/master/app).
- [All sass files](https://github.com/AlexLasagna/gulp-starter/tree/master/app/sass).
- [All pug files](https://github.com/AlexLasagna/gulp-starter/tree/master/app/pug).

# Pug files structure

If you don't familiar with pug, please read [pug docs](https://pugjs.org/language/attributes.html). You can also just code at html files without pug and create new ones and page will be still hot loaded.

- Base structure of pages is in [pug/layouts](https://github.com/AlexLasagna/gulp-starter/tree/master/app/pug/layouts) folder.
- To create new page: create file next to index.pug in a [pug folder](https://github.com/AlexLasagna/gulp-starter/tree/master/app/pug).
and add this lines at the top of the page:
```jade
extends layouts/base

block page-content
  section
    | Hello World
```
This will connect your new page with your [base page config](https://github.com/AlexLasagna/gulp-starter/blob/master/app/pug/layouts/base.pug). You can also create new base files(configs) and include(extend) them into your pages.
- All parts of index(or any other) page are in [pug/parts](https://github.com/AlexLasagna/gulp-starter/tree/master/app/pug/parts)

# Sass files structure

Do __NOT__ write your css code at [css folder](https://github.com/AlexLasagna/gulp-starter/tree/master/app/css) because when you run your app again(`gulp`) this files will be overwritten.

- [Bourbon](https://www.bourbon.io/docs/latest/) is Sass mixin library that helps to simplify life.
- Files with an underscore in the title won't compile.
- _var.sass file is a flex mixins file.
- I adhere to [mobile-first](https://zellwk.com/blog/how-to-write-mobile-first-css/) approach so every template_styles file will be loaded on its resolution. For instance, template_styles.sass will be loaded at mobile || tablet || desktop but template_styles_desktop.sass will be loaded only at desktop (1200px+)

# Build production

To build a production version of your app you need to type `gulp build` in a console. This will create dist folder where everything will be compressed and minified.
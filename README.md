# Gulp 4 with Webpack 4

Fast builder for your static page projects.

<p>
	<img src="https://readmeimgs-rxzwiczcsi.now.sh/gulp.png" alt="Gulp starter pack">
</p>


Use the convenience of [Gulp](https://gulpjs.com/) along with All JavaScript features using [Webpack](https://webpack.js.org/)


# Installation

1) Install Gulp and Webpack dependencies via npm `npm i` or yarn `yarn install`.

2) If you need to install the library like [lodash](https://lodash.com/) install it via npm/yarn and just do an import in the js file. There is no need to include it in the html file.

3) Start your web server by `npm start`.

4) Write your code.

# Location of stuff

    .
    ├── app/                    # App folder with all developer stuff
    │   ├── css/                # Compiled css from sass (don't write code here)
    │   ├── js/                 # Webpack js entry, map files, final bundle
    │   ├── sass/               # Sass files + bourbon
    │   ├── pug/                # Pug files
    │   └── html                # Compiled html from pug (don't write code here)
    ├── webpack.config.js       # all webpack settings
    ├── gulpfile.js             # all gulp settings
    └── ...

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

Do __NOT__ write your css code at [css folder](https://github.com/AlexLasagna/gulp-starter/tree/master/app/css) because when you run your app again this files will be overwritten.

- [Bourbon](https://www.bourbon.io/docs/latest/) is Sass mixin library that helps to simplify life.
- Files with an underscore in the title won't compile.
- _var.sass file is a flex mixins file.
- I adhere to [mobile-first](https://zellwk.com/blog/how-to-write-mobile-first-css/) approach so every template_styles file will be loaded on its resolution. For instance, template_styles.sass will be loaded at mobile || tablet || desktop but template_styles_desktop.sass will be loaded only at desktop (1200px+)

# Build production

To build a production version of your app you need to type:

`npm run build`

This will start the gulp and webpack build processes and then create dist folder where everything will be compressed, minified and perfect.
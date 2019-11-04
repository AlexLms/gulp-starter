const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const del = require('del');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cache = require('gulp-cache');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const extReplace = require('gulp-ext-replace');
const autoprefixer = require('gulp-autoprefixer');
const webpackStream = require('webpack-stream');
const util = require('gulp-util');
const webpackConfig = require('./webpack.config.js');

const isProduction = !!util.env.production;

// compile our js using webpack
gulp.task('scripts', () => gulp.src('app/js/common.es6.js')
  .pipe(webpackStream(webpackConfig(isProduction)))
  .on('error', function () {
    this.emit('end'); // Recover from errors
  })
  .pipe(gulp.dest('app/js'))
  .pipe(browserSync.stream()));

// compile our sass
gulp.task('sass', () => gulp.src('app/sass/**/*.sass')
  .pipe(sourcemaps.init())
  .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
  .pipe(sass())
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(sourcemaps.write('app.css'))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.stream()));

// sass minify
gulp.task('sass-manify', () => gulp.src('app/sass/**/*.sass')
  .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
  .pipe(sass())
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(cssnano())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.stream()));

// compile our pug
gulp.task('pug', () => gulp.src(['app/pug/*.pug', '!app/pug/*.ajax.pug'])
  .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
  .pipe(pug({ pretty: true }))
  .pipe(gulp.dest('app'))
  .pipe(browserSync.stream()));

// make img size smaller
gulp.task('img', () => gulp.src('app/img/**/*')
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{ removeViewBox: false }],
    use: [pngquant()],
  })))
  .pipe(gulp.dest('dist/img')));

// watch for changings
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: 'app',
    },
    notify: false,
  });
});

// delete our old production folder
gulp.task('clean', (done) => {
  del.sync('dist');
  done();
});

// watch taks
gulp.task('watch', () => {
  gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
  gulp.watch('app/sass/**/*.sass', gulp.parallel('sass-manify'));
  gulp.watch('app/js/common.es6.js', gulp.parallel('scripts'));
  gulp.watch('app/pug/**/*.pug', gulp.parallel('pug'));
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

// build production
gulp.task('build',
  gulp.series('clean', gulp.parallel('img', 'sass', 'sass-manify', 'scripts'),
    (done) => {
      gulp.src([
        'app/css/template_styles.css',
        'app/css/template_styles_tablet.css',
        'app/css/template_styles_desktop.css',
        'app/css/template_styles.min.css',
        'app/css/template_styles_tablet.min.css',
        'app/css/template_styles_desktop.min.css',
      ])
        .pipe(gulp.dest('dist/css'));

      gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

      gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));

      gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

      gulp.src('app/libs/**')
        .pipe(gulp.dest('dist/libs/'));
      done();
    }));

// default task
gulp.task('default', gulp.parallel('watch', 'pug', 'scripts', 'browser-sync', 'sass', 'sass-manify'));

// usefull tasks
gulp.task('del-min', () => gulp.src('app/optimized/**')
  .pipe(extReplace('.jpg', '-min.jpg'))
  .pipe(gulp.dest('app/without')));
gulp.task('svgstore', () => gulp.src('app/img/svg/*.svg')
  .pipe(svgmin())
  .pipe(svgstore())
  .pipe(rename({ basename: 'sprite' }))
  .pipe(gulp.dest('./app/img/')));

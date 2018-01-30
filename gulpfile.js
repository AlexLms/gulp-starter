const gulp      	 = require('gulp'),
	sass         = require('gulp-sass'),
	pug          = require('gulp-pug'),
	sourcemaps   = require('gulp-sourcemaps'),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglifyjs'),
	cssnano      = require('gulp-cssnano'),
	rename       = require('gulp-rename'),
	del          = require('del'),
	plumber 		 = require('gulp-plumber'),
	notify 			 = require('gulp-notify'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	cache        = require('gulp-cache'),
	svgmin 			 = require('gulp-svgmin'),
	svgstore 		 = require('gulp-svgstore'),
	babel 			 = require('gulp-babel'),
	ext_replace = require('gulp-ext-replace'),
	autoprefixer = require('gulp-autoprefixer');


 // compile our sass
gulp.task('sass', () => {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sourcemaps.init())
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(sourcemaps.write('app.css'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('es6', () => {
	return gulp.src('app/js/common.es6.js')
	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(ext_replace('.js', '.es6.js'))
	.pipe(rename({suffix: '.es5'}))
	.pipe(gulp.dest('app/js'))
});

/* compile our pug */
gulp.task('pug', () => {
    return gulp.src(['app/pug/*.pug', '!app/pug/*.ajax.pug'])
    	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
      .pipe(pug({pretty: true}))
      .pipe(gulp.dest('app'))
      .pipe(browserSync.reload({stream: true}))
});
gulp.task('pug-ajax', () => {
    return gulp.src('app/pug/ajax/*.ajax.pug')
    	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
      .pipe(pug({pretty: true}))
      .pipe(gulp.dest('app/ajax'))
      .pipe(browserSync.reload({stream: true}))
});
gulp.task('svgstore', () => {
	return gulp.src('app/img/svg/*.svg')
	.pipe(svgmin())
	.pipe(svgstore())
	.pipe(rename({basename: 'sprite'}))
	.pipe(gulp.dest('./app/img/'))
});

/* manify our css */

gulp.task('css-manify', ['sass'], () => {
	return gulp.src(['app/css/**/*.css', '!app/css/**/*.min.css', '!app/css/app.css'])
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'));
});
/* make img size smaller */
gulp.task('img', () => {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});

/* online watch for changings */
gulp.task('browser-sync', () => {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

/* just simple watch taks */

gulp.task('watch', ['browser-sync', 'sass', 'css-manify', 'es6'], () => {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/js/common.es6.js', ['es6']);
	gulp.watch('app/pug/**/*.pug', ['pug']);
	gulp.watch('app/pug/**/*.ajax.pug', ['pug-ajax']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});
/* delete our old production folder */
gulp.task('clean', () => {
	return del.sync('dist');
});
gulp.task('clear', () => {
	return cache.clearAll();
})

/* build production */
gulp.task('build', ['clean', 'img', 'sass'], () => {

	const buildCss = gulp.src([
		'app/css/template_styles.css',
		'app/css/template_styles_tablet.css',
		'app/css/template_styles_desktop.css',
		'app/css/template_styles.min.css',
		'app/css/template_styles_tablet.min.css',
		'app/css/template_styles_desktop.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	const buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

	const buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'))

	const buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

	const buildlibs = gulp.src('app/libs/**')
	.pipe(gulp.dest('dist/libs/'))

});


/* default task */
gulp.task('default', ['watch', 'pug', 'pug-ajax', 'es6']);

// gulp.task('del-min', function(){
// 	return gulp.src('app/optimized/**')
// 		.pipe(ext_replace('.jpg', '-min.jpg'))
// 		.pipe(gulp.dest('app/without'))
// });


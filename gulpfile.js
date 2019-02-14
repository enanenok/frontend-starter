'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const include = require('gulp-include');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const del = require('del');


// Static server
gulp.task('server', function() {
  browserSync.init({
		server: {
			baseDir: "public"
		},
		notify: false,
		open: 'external',
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
  });

  gulp.watch('public/**/*').on('change', browserSync.reload);
});

// SCSS
gulp.task('scss', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'expanded' }))
		.on("error", notify.onError("Error: <%= error.message %>"))
		.pipe(autoprefixer(['last 5 versions']))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('public/css'))
}); 

// HTML
gulp.task('html', function() {
	return gulp.src('app/*.html')
		.pipe(gulp.dest('public/'))
});

// JavaScript
gulp.task('js', function() {
  return gulp.src('app/js/scripts.js')
		.pipe(include())
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('public/js/'))
});

// Copy Img
gulp.task('img', function() {
	return gulp.src('app/img/**/*.*')
		.pipe(gulp.dest('public/img'))
});

// Copy Fonts
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*.*')
		.pipe(gulp.dest('public/fonts'))
});

// Clean Public
gulp.task('clean', function() {
return del('public/*')
});

gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
	gulp.watch('app/*.html', gulp.parallel('html'))
	gulp.watch(['libs/**/*.js', 'app/js/**/*.js'], gulp.parallel('js'));
	gulp.watch('app/img/**/*.*', gulp.parallel('img'))
	gulp.watch('app/fonts/**/*.*', gulp.parallel('fonts'))
});



gulp.task('default', gulp.series(
	'clean',
	gulp.parallel('html', 'scss', 'js', 'img', 'fonts'),
	gulp.parallel('watch', 'server')
));
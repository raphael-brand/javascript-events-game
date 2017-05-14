var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var bsConfig = require('./bs-config.json');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var uglifyjs = require('gulp-uglifyjs');
var concat = require('gulp-concat');

/**
 * Compile pug files into HTML
 */
gulp.task('templates', function () {

  var YOUR_LOCALS = {
    "message": "This app is powered by gulp.pug recipe for BrowserSync"
  };

  return gulp.src('./app/*.pug')
    .pipe(pug({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'));
});

/**
 * Important!!
 * Separate task for the reaction to `.pug` files
 */
gulp.task('pug-watch', ['templates'], reload);

gulp.task('sass-bootstrap', function () {
  return gulp.src([
    'bower_components/bootstrap-sass-no-js/vendor/assets/stylesheets/bootstrap.scss'
  ])
    .pipe(sass()).on('error', sass.logError)
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({ stream: true }));
});
/**
 * Sass task for live injecting into all browsers
 */
gulp.task('sass', function () {
  return gulp.src([
    './app/scss/*.scss'])
    .pipe(sass()).on('error', sass.logError)
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({ stream: true }));
});

gulp.task('js', function () {
  return gulp.src([
    'app/js/test-module.js',
    'app/js/main.js']
  )
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({ stream: true }))
});
/**
 * Serve and watch the scss/pug files for changes
 */
gulp.task('default', ['sass', 'templates', 'js'], function () {

  browserSync(bsConfig);
  gulp.watch('./app/js/*.js', ['js']);
  gulp.watch('./app/scss/*.scss', ['sass']);
  gulp.watch('./app/*.pug', ['pug-watch']);
});

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    jade = require('gulp-jade'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    gls = require('gulp-live-server'),
    del = require('del'),
    plugins = require('gulp-load-plugins'),
    order = require('gulp-order');

 var JADE_COMPILED_FILES = ['app/**/*.jade'];

 var SCRIPTS_COMPILED_FILES = [
  'app/scripts/routes.js',
 	'app/scripts/app.js',
 	'app/scripts/**/*Controller.js',
 	'app/scripts/**/*Service.js',
 	'app/scripts/**/*.js'
 ];


// Compile HTML from Jade
gulp.task('jade', function() {
  gulp.src(JADE_COMPILED_FILES)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./build/'))
    .pipe(notify({ message: 'Your Jade file has been molded into HTML.' }))
});

//move dependencies to build folder
gulp.task('move', function(){
    gulp.src(['./app/bower_components/**/*.{json,css,js,gzip,map,md}'])
    .pipe(gulp.dest('./build/bower_components/'))
});


gulp.task('styles', function() {
  return sass('app/styles/**/*.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('build/styles'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('build/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src(SCRIPTS_COMPILED_FILES)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});


// Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    //.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('app/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('app/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('app/images/**/*', ['images']);


   // Watch jade files
  gulp.watch('app/**/*.jade', ['jade']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  //gulp.watch(['dist/**']).on('change', livereload.changed);

});

// Clean
gulp.task('clean', function() {
  return del(['build/styles', 'build/scripts', 'build/images']);
});


gulp.task('webserver', function() {
  connect.server({
  	root: 'build',
    livereload: true
  });
});


gulp.task('default', ['clean','styles','images','jade','move','scripts', 'webserver', 'watch']);


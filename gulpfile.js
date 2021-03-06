// include gulp
var gulp = require('gulp'); 
 
// include plug-ins
var jshint = require('gulp-jshint'),
	changed = require('gulp-changed'),
	imagemin = require('gulp-imagemin'),
	concat = require('gulp-concat'),
	stripDebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	autoprefix = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	livereload = require('gulp-livereload'),
  jade = require('gulp-jade'),
	processhtml = require('gulp-processhtml');

//Sources
  var htmlSrc = './build/*.html',
      htmlDst = './build';
  var jadeSrc = './src/*.jade',
      jadeIncludes = './src/includes/*.jade',
      jadeDst = './build';
  var imgSrc = './src/img/**/*',
      imgDst = './build/img';
  var jsSrc = './src/js/*.js',
  	  jsDst = './build/js/';
  var cssSrc = './src/css/*.css',
  	  cssDst = './build/css/';

// JS hint task
gulp.task('jshint', function() {
  gulp.src(jsSrc)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//Minify images
gulp.task('imagemin', function() {
  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(jsSrc)
    .pipe(gulp.dest(jsDst));
});

gulp.task('vendors', function() {
  gulp.src('./res/*.js')
    .pipe(gulp.dest('./build/vendors/'));
});
 
// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(cssSrc)
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(cssDst));
});

gulp.task('livereload', function() {
  var server = livereload();
  gulp.watch('build/**').on('change', function(file) {
      server.changed(file.path);
  });
});

gulp.task('jade', function () {
  var YOUR_LOCALS = {};
  gulp.src(jadeSrc)
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
     }))
    .pipe(gulp.dest('./build'));
});

// default gulp task
gulp.task('default', ['imagemin', 'scripts', 'vendors', 'styles','livereload','jade'], function() {
	  // watch for JS changes
	  gulp.watch(jsSrc, function() {
	    gulp.run('scripts', 'jshint');
	  });
	 
	  // watch for CSS changes
	  gulp.watch(cssSrc, function() {
	    gulp.run('styles');
	  });

    gulp.watch(jadeSrc, function() {
      gulp.run('jade');
    });

    gulp.watch(jadeIncludes, function() {
      gulp.run('jade');
    });
});
var del = require('del');
var pkg = require('../package.json');
var gulp = require('gulp');
var gutil = require('gulp-util');
var header = require('gulp-header');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var webpack = require('webpack');
var webpackConfig = require('./webpack.conf');

var BANNER =
  '/*! Spiral Image Cropper Widget v${pkg.version}\n' +
  ' *  https://github.com/spiral-modules/image-cropper/\n' +
  ' *  Copyright (c) 2016, Alex Chepura, Yauheni Yasinau, spiralscout.com\n' +
  ' */\n\n';

module.exports = function(config) {
  gulp.task('source', function(callback) {
    webpack(webpackConfig, function(err, stats) {
      var json = stats.toJson();
      (json.warnings || []).forEach(function(warning) {
        gutil.log(gutil.colors.yellow("[webpack] " + warning));
      });
      (json.errors || []).forEach(function(error) {
        gutil.log(gutil.colors.red("[webpack] " + error));
      });
      if (err) throw new gutil.PluginError('webpack', err);
      callback();
    });
  });

  gulp.task('minify', function() {
    return gulp.src('./resources/scripts/spiral/sf.crop.js')
        .pipe(uglify({
          banner: BANNER
        }))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('./resources/scripts/spiral/'));
  });

  gulp.task('dist', function() {
    return gulp.src(['./resources/scripts/spiral/sf.crop.js', './resources/scripts/spiral/sf.crop.min.js'])
        .pipe(header(BANNER, { pkg: pkg }))
        .pipe(gulp.dest('./resources/scripts/spiral/'));
  });

};


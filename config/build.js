var del = require('del');
//var flatten = require('gulp-flatten');
//var pkg = require('../package.json');
var gulp = require('gulp');
var gutil = require('gulp-util');
//var gzip = require('gulp-gzip');
//var header = require('gulp-header');
//var jade = require('gulp-jade');
//var rename = require('gulp-rename');
//var stylus = require('gulp-stylus');
//var tar = require('gulp-tar');
//var uglify = require('gulp-uglify');
var webpack = require('webpack');
var webpackConfig = require('./webpack.conf');

var BANNER =
  '/*! Spiral Image Cropper Widget v${pkg.version}\n' +
  ' *  https://github.com/spiral-modules/image-cropper/\n' +
  ' *  Copyright (c) 2016, Alex Chepura, spiralscout.com\n' +
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
};

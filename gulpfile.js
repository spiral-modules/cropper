var gulp = require('gulp');
var runsequence = require('run-sequence');
var buildTasks = require('./config/build.js');
//var serverTasks = require('./config/server.js');
//var testTasks = require('./config/test.js');

var config = {
  serverPort: 5020,
  testPort: 5021
};
config.host = 'localhost:' + config.serverPort;

buildTasks(config);
//serverTasks(config);
//testTasks(config);

gulp.task('default', ['build']);

gulp.task('build', ['source']);
gulp.task('npm', function(callback) {
  runsequence(
    'clean',
    ['source', 'theme'],
    'dist'
  , callback);
});
gulp.task('build:release', function(callback) {
  runsequence(
    'clean',
    'build',
    'minify',
    'dist',
    'compress'
  , callback);
});

gulp.task('test', ['karma:test']);
gulp.task('test:unit', ['karma:test']);
gulp.task('test:e2e', ['protractor:test']);
gulp.task('test:coverage', ['karma:coverage']);

gulp.task('dev', ['build', 'watch', 'server', 'karma:server']);

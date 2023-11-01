const gulp = require('gulp');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const sass = require('gulp-sass')(require('sass'));
const path = require('path');

const sourceDir = './src';
const jsDir = 'js';
const cssDir = 'css';
const jsPaths = [path.join(sourceDir, jsDir, '**/*.js')];
const cssPaths = [path.join(sourceDir, cssDir, '**/*.scss')]
const destDir = 'static';

gulp.task('scripts', function () {
  return gulp.src(jsPaths, {ignore: path.join(sourceDir, jsDir, 'libs/**') + ',' + path.join(sourceDir, jsDir, 'search-page.js')})
    .pipe(named())
    .pipe(webpack({
      mode: 'production',
      devtool: "source-map",
      externals: {
        jquery: 'jQuery',
        bootstrap: 'bootstrap'
      }
    }))
    .pipe(gulp.dest(path.join(destDir, jsDir)));
});


gulp.task('styles', function () {
  return gulp.src(cssPaths)
    .pipe(named())
    .pipe(sass())
    .pipe(gulp.dest(path.join(destDir, cssDir)));
});


gulp.task('watch', function () {
  gulp.watch(jsPaths, gulp.series('scripts'));
  gulp.watch(cssPaths, gulp.series('styles'));
});

gulp.task('default', gulp.parallel(['scripts', 'styles']));

'use strict'
var gulp = require('gulp');
var webpack = require('gulp-webpack');
var del = require('del');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');

gulp.task('build:scripts', function(cb){
    return gulp.src('./src/WooAlbum.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./dst'))
})

gulp.task('build:css', function(cb){
    return gulp.src('./src/css/*.css')
        .pipe(minifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dst'))
})

gulp.task('clean:sripts', function(cb){
    del('./dst/*.js', cb);
})

gulp.task('watch', function(cb){
    gulp.watch('./src/*.js',['build:scripts']);
});

gulp.task('default', ['build']);
gulp.task('build', ['build:scripts','build:css']);
gulp.task('clean', ['clean:scripts']);


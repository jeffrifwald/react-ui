'use strict';

const path = require('path');

const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const tap = require('gulp-tap');


gulp.task('build:src', () => {
    return (
        gulp
        .src([
            'packages/**/src/*.js',
            'packages/**/src/**/*.js'
        ])
        .pipe(babel())
        .pipe(rename((path) => {
            path.dirname = path.dirname.replace(/\/src/g, '/lib');
        }))
        .pipe(gulp.dest('packages'))
    );
});

gulp.task('create:indexes', ['build:src'], () => {
    gulp
    .src('packages/**/lib/index.js')
    .pipe(tap((file) => {
        file.contents = new Buffer(`module.exports = require('./lib');\n`);;
    }))
    .pipe(rename((path) => {
        path.dirname = path.dirname.replace(/\/lib/g, '');
    }))
    .pipe(gulp.dest('packages'));
});

gulp.task('build', ['create:indexes']);

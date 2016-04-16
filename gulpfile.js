'use strict';

const path = require('path');

const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const tap = require('gulp-tap');
const named = require('vinyl-named');
const webpack = require('webpack-stream');


gulp.task('compile_src:packages', () => {
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

gulp.task('compile_src:docs', () => {
    return (
        gulp
        .src([
            'docs/src/*.js',
            'docs/src/**/*.js'
        ])
        .pipe(babel())
        .pipe(gulp.dest('docs/lib'))
    );
});

gulp.task('create_indexes:packages', ['compile_src:packages'], () => {
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

gulp.task('webpack_src:docs', ['compile_src:docs'], () => {
    return (
        gulp
        .src('docs/lib/index.js')
        .pipe(named())
        .pipe(webpack({
            externals: {
                react: 'React',
                'react-dom': 'ReactDOM'
            },
            output: {
                filename: '[name].js'
            },
            quiet: true
        }))
        .pipe(gulp.dest('docs/static/scripts'))
    );
});

gulp.task('build:packages', ['create_indexes:packages']);
gulp.task('build:docs', ['webpack_src:docs']);
gulp.task('build', ['build:packages', 'build:docs']);

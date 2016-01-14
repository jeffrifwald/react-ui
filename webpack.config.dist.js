'use strict';

const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nib = require('nib');
const shelljs = require('shelljs');
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;
const webpack = require('webpack');

shelljs.ls('src').filter((name) => {
    return name !== 'index.js' && name !== 'utils.js' && name !== '__tests__';
}).forEach((name) => {
    shelljs.cp(`src/${name}/index.js`, `${name}.js`);
});

module.exports = {
    entry: {
        'react-ui.js': './src/index.js',
        'react-ui.min.js': './src/index.js',
        'react-ui.css': './style/react-ui.styl'
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            include: /src/,
            test: /\.js$/,
            query: {
                cacheDirectory: '.babelcache'
            }
        }, {
            loader: ExtractTextPlugin.extract('css-loader!stylus-loader'),
            include: /style/,
            test: /\.styl$/
        }]
    },
    output: {
        filename: '[name]',
        path: './dist'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min.js$/,
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('[name]')
    ]
};

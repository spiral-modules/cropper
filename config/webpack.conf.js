var path = require('path');
var pkg = require('../package.json');
var webpack = require('webpack');

var constantPack = new webpack.DefinePlugin({
    CROP_VERSION: JSON.stringify(pkg.version)
});

module.exports = {
    entry: {
        crop: ['./src/index.js']  // webpack workaround issue #300
    },
    output: {
        filename: 'sf.crop.js',
        //library: 'sCrop',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, '..', 'resources/scripts/spiral/')
    },
    resolve: {
        alias: {
            'sf': path.resolve(__dirname, '..', 'node_modules/sf/src/sf')
        },
        extensions: ['', '.js']
    },
    resolveLoader: {
        root: path.resolve(__dirname, '..', 'node_modules')
    },
    module: {
        loaders: [
            {test: /\.js?$/, loader: 'babel?presets[]=es2015&plugins[]=transform-runtime'}
        ],
        noParse: [
            ///\/node_modules\/clone\/clone\.js$/,
            ///\/node_modules\/eventemitter3\/index\.js$/,
            ///\/node_modules\/extend\/index\.js$/
        ]
    },
    plugins: [constantPack],
    devtool: 'source-map',
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "sf": "sf"
    }
};

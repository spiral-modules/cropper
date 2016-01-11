var path = require('path');
var pkg = require('../package.json');
var webpack = require('webpack');

var constantPack = new webpack.DefinePlugin({
    CROP_VERSION: JSON.stringify(pkg.version)
});

module.exports = {
    watch: true,
    entry: {
        crop: ['./src/index.js']  // webpack workaround issue #300
    },
    output: {
        filename: 'sf.crop.js',
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
        noParse: []
    },
    plugins: [constantPack],
    externals: {
        "sf": "sf"
    }
};

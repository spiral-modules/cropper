var path = require('path');
var pkg = require('../package.json');
var webpack = require('webpack');

var constantPack = new webpack.DefinePlugin({
    CROP_VERSION: JSON.stringify(pkg.version)
});

var BANNER =
    'Spiral Image Cropper Widget v'+pkg.version+'\n' +
    'https://github.com/spiral-modules/image-cropper/\n' +
    'Copyright (c) 2016, Alex Chepura, Yauheni Yasinau, spiralscout.com';

var bannerPlugin = new webpack.BannerPlugin(BANNER);
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
});

module.exports = {
    //watch: true,
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
    devtool: 'source-map',
    plugins: [constantPack,bannerPlugin,uglifyJsPlugin],
    externals: {
        "sf": "sf"
    }
};

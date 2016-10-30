var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var builddir = __dirname + "/build";

module.exports = {
    entry: {
        app: './src/svg_gauge_circle.js',
    },
    output: {
        path: builddir,
        filename: 'svg-gauge-circle.min.js',
        library: 'SvgGaugeCircle',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        publicPath: '/build'
    },
    externals: [{
        "window": "window"
    }],
    module: {
        loaders: [{
            test: /.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        }]
    },
    plugins: [new UglifyJsPlugin({
        minimize: true
    })]

};

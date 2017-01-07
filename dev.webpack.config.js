var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: './main-dev.js',
        vendor: ["zepto", "velocity-commonjs"]
    },
    output: {
          path: __dirname,
          filename: 'bundle.js',
    },
    devtool: 'source-map',
    devServer: {
        inline: true,
        contentBase: __dirname,
        port: 3333
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
        }, {
            test: require.resolve('zepto'),
            loader: "imports?this=>window!exports?window.Zepto"
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            "name": "vendor",
            "filename": "vendor.bundle.js"
        })
    ]
};

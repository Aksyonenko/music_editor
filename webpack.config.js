var webpack = require('webpack');
var path = require('path');


var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
    entry: APP_DIR + '/index.jsx',
    //entry: {
    //    helloWorld: [
    //        'webpack-dev-server/?http://localhost:8080',
    //        APP_DIR + '/index.jsx'
    //    ]
    //},
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader" }
        ]
    }
};

module.exports = config;
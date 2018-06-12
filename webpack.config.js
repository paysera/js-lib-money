const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv) => {
    const config = {
        output: {
            library: 'PayseraMoney',
            libraryTarget: 'umd',
            globalObject: "typeof self !== 'undefined' ? self : this",
        },
        module: {
            rules: [
                { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
            ]
        },
        externals: {
            'bignumber.js': {
                commonjs: 'bignumber.js',
                commonjs2: 'bignumber.js',
                amd: 'bignumber',
                root: 'BigNumber'
            },
            'lodash-es': {
                commonjs: 'lodash',
                commonjs2: 'lodash',
                amd: 'lodash',
                root: '_'
            }
        },
        devtool: 'source-map'
    };

    if (argv.mode === 'development') {
        config.devServer = {
            contentBase: [
                path.join(__dirname, 'demo/web'),
                path.join(__dirname, 'node_modules'),
            ],
            watchContentBase: true,
            port: 9000
        };
    }

    if (argv.mode === 'development') {
        config.plugins = [
            new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ];
    }

    return config;
};

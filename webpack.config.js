const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    output: {
        library: 'PayseraMoney',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    devtool: 'source-map',
    context: path.resolve(__dirname, '.'),
    externals: [nodeExternals()],
};

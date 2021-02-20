const path = require("path")
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    entry: 'index.js',
    output: {
        path: path.resolve('lib'),
        filename: 'index.js',
        library: "fluid-form",
        libraryTarget: "commonjs2"
    },
    externals: [nodeExternals(), {
        react: 'react',
        yup: 'yup',
    }],
    optimization: {
        minimize: true
    },
    module: {
        rules: [{
            test: /.(js|jsx)$/,
            exclude: /node_modules/,
            resolve: {
                extensions: ['.js', '.jsx'],
            },
            loader: "babel-loader"
        }]
    },
    target: 'node',
    node: {
        __dirname: true
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.jsx']
    }
}
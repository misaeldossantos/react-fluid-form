const path = require("path")
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    entry: 'index.ts',
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
            test: /.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            resolve: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            loader: "babel-loader"
        }]
    },
    target: 'node',
    node: {
        __dirname: true
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.jsx', '.t']
    }
}
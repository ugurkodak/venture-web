const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    mode: 'development',
    watch: true,
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new WebpackShellPlugin({ onBuildEnd: 'node server.js' }) // TODO: Fix deprecation warning
    ],
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader' }
        ]
    }
}
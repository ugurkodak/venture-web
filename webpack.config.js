const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        // alias: { 'xterm-css': path.join(__dirname, 'node_modules/xterm/dist/xterm.css') }
    },
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', {
            //         loader: 'typings-for-css-modules-loader',
            //         options: {
            //             modules: true,
            //             namedExport: true,
            //             camelCase: true
            //         }
            //     }]
            // },
            { test: /\.tsx?$/, use: 'ts-loader' }
        ]
    }
}
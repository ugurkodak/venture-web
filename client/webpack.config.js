const path = require('path');
const spawn = require('child_process').spawn

module.exports = (env, argv) => {
    return {
        //TODO: Pass environment and mode parameters
        mode: 'development',
        // mode: 'production',
        devtool: 'inline-source-map',
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        module: {
            rules: [
                { test: /\.tsx?$/, use: 'ts-loader' }
            ]
        },
        plugins: [
            {
                //Run firebase serve when npm start is executed.
                apply: (compiler) => {
                    if (argv.start) {
                        const child = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'serve']);
                        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                            child.stdout.on('data', (data) => {
                                process.stdout.write(data);
                            });
                            child.stderr.on('data', (data) => {
                                process.stderr.write(data);
                            });
                        });
                    }
                }
            }
        ]
    }
};
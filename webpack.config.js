const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    target: 'webworker', // Cloudflare Workers environment
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            // Aliases for weakref and finalization-registry polyfills
            'undici/lib/web/fetch/dispatcher-weakref': path.resolve(__dirname, 'polyfills/weakref-polyfill.js'),
            'undici/lib/web/fetch/finalization-registry': path.resolve(__dirname, 'polyfills/finalization-registry-polyfill.js'),
        },
        
    },
    externals: ['undici'], // Treat undici as an external dependency if necessary
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                   loader: 'babel-loader',
                    options: {
                        // This is optional if you have a .babelrc file
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-optional-chaining'
                        ]
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser',
        }),
    ],
};

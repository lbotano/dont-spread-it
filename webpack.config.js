const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC = path.resolve(__dirname, 'src');
const DIST = path.resolve(__dirname, 'dist/dev');

module.exports = {
    context: SRC,
    devtool: 'source-map',
    mode: 'development',

    entry: {
        'main': './index.ts'
    },

    output: {
        filename: 'bundle.js',
        path: DIST
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'source-map-loader',
                enforce: 'pre'
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
            {
                test: /\.ttf$/,
                use: [
                    {
                        loader: 'only-ttf-loader',
                        options: {},
                    }
                ]
            },
            {
                test: /\.ts$/,
                exclude: [
                    /node_modules/
                ],
                use: 'awesome-typescript-loader'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            minify: true,
            hash: true,
            template: `${SRC}/index.ejs`
        })
    ]
}
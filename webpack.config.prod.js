const path = require('path');
const Dotenv = require('dotenv-webpack');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin(),
        new CleanPlugin.CleanWebpackPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
};
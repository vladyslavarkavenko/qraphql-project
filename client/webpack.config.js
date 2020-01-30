const path = require('path');

const DotenvWebpack = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/index.tsx'],
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '/build'),
    },
    devtool: "source-map",
    resolve: {
        extensions: [
            ".ts", ".tsx",
            ".js", ".jsx",
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    },
                    {
                        loader: "eslint-loader"
                    }
                ]
            },
            {
                test: /\.(graphql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/assets/template.html'
        }),
        new DotenvWebpack()
    ]
};

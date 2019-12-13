const path = require('path');
const nodeExternals = require('webpack-node-externals');

const ENTRY_PATH = path.resolve(__dirname, 'src');
const OUTPUT_PATH = path.resolve(__dirname, 'build');

module.exports = {
  entry: ENTRY_PATH,
  output: {
    filename: '[name].js',
    path: OUTPUT_PATH,
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.graphql$/,
        exclude: /node_modules/,
        use: {
          loader: 'raw-loader',
        },
      },
    ],
  },
};

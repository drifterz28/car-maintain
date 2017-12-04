const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const resolveRoot = require('path').resolve.bind(null, __dirname, '..');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const extractSass = new ExtractTextPlugin({
  filename: "[name].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  devtool: 'inline-source-map',
  entry: ['./src/main.js'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'static'),
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    extractSass,
    new CopyWebpackPlugin([
      { from: 'src/index.html', to: 'index.html', force: true },
    ])
  ]
};

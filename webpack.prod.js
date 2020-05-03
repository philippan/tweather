const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: "production", 
    entry: ['whatwg-fetch', './src/client/js/app.js'],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: "/",
      library: "MyLibrary",
      libraryTarget: "umd",
    },
    devtool: "source-map", 
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 8080,
        open: 'Google Chrome'
    },
    watch: true,
    context: __dirname, 
    target: "web",
    stats: "normal",
    module: {
      rules: [
          {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env']
                  }
              }
          },
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: ["source-map-loader"],
              enforce: "pre"
          },
          {
              test: /\.html$/i,
              exclude: /node_modules/,
              loader: 'html-loader',
          },
          {
              test: /\.json$/,
              exclude: /node_modules/,
              loader: 'json-loader'
          },
          {
              test: /\.css$/i,
              exclude: /node_modules/,
              use: ['style-loader', 'css-loader'],
          },
          {
              test: /\.s(a|c)ss$/,
              exclude: /node_modules/,
              use: ['style-loader', 'css-loader', 'sass-loader']
          },
      ],
    },
  plugins: [
      new HtmlWebpackPlugin({
          template: "./src/client/views/index.html",
          filename: "./index.html"
      }),
      new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
      }),
      new Dotenv(),
      new WorkboxPlugin.GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
      })
  ]
}
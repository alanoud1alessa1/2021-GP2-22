const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path:path.resolve(__dirname, "dist"),
  },
  module: {
    loaders: [
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ]
  },
  // module: {
  //   loaders: [
  //   { test: /\.(png|jpg)$/, loader: ‘url-loader?limit=8192’ }
  //   ]
  //   },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
}
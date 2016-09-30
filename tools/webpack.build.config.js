const SVGStore = require('webpack-svgstore-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const config = require('./webpack.common.config');
const resolve = require('./path-helpers').resolve;
const join = require('path').join;

module.exports = merge(config, {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap'),
        exclude: /node_modules/
      }
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),

    new SVGStore(
      [ resolve('src', 'assets', 'svg', 'icons', '*.svg') ],
      join('lib'),
      {
        name: 'sprite.svg'
      }
    )
  ]
});

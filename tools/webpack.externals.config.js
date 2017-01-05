const merge = require('webpack-merge');
const config = require('./webpack.build.config');

module.exports = merge(config, {
  externals: {
    jquery: 'jQuery',
  },
});

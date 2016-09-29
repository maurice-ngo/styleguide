const merge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const opn = require('opn');

const config = require('./webpack.build.config');

module.exports = merge(config, {
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8080/',
      open: false,
    }, {
      callback: function() {
        opn('http://localhost:3000/site')
      }
    }),
  ]
});

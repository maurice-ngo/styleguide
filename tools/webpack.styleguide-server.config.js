const merge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const opn = require('opn');

const config = require('./webpack.styleguide.config');
const resolve = require('./path-helpers').resolve;

module.exports = merge(config, {
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8080/',
      open: false,
      // TODO: Get file watcher working for templates
      // files: [
      //   resolve('src', 'views', '*.html'),
      //   resolve('ui', 'layouts', '**', '*')
      // ]
    }, {
      callback: function() {
        opn('http://localhost:3000/site')
      }
    }),
  ]
});

const resolve = require('./path-helpers').resolve;
const FabricatorPlugin = require('./fabricator-webpack-plugin');

module.exports = {
  entry: {
    'site/fabricator': resolve('ui', 'assets', 'fabricator', 'fabricator.js'),
    'lib/styleguide': resolve('src', 'assets', 'styleguide.js')
  },

  output: {
    path: resolve(),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.js', '.scss']
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          resolve('src', 'assets'),
          resolve('ui', 'assets')
        ],
        exclude: /node_modules/
      }, {
        test: /\.html$/,
        loader: 'handlebars-loader',
        extensions: '.html'
      }
    ]
  },

  plugins: [
    new FabricatorPlugin({
      dest: resolve('site'),
      layout: 'default',
      layouts: resolve('ui/layouts/*'),
      layoutIncludes: resolve('ui/layouts/includes/*'),
      views: resolve('src/views/**/*'),
      materials: resolve('src/materials/**/*'),
    	data: resolve('src/data/**/*'),
    	docs: resolve('src/docs/**/*.md')
    })
  ]
};

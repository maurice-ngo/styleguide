var resolve = require('path').resolve;
var join = require('path').join;
var webpackConfig = require('./webpack.test.config');

module.exports = function(config) {
  config.set({
    basePath: resolve(__dirname, '..'),

    frameworks: ['mocha', 'fixture', 'jquery-2.1.0', 'sinon'],

    files: [
      'src/assets/test-index.js',
      'src/materials/elements/favorite-buttons/*.html',
      'src/materials/modules/modals/**/*.html',
      'src/materials/modules/*.html'
    ],

    exclude: [
      '**/*.sw*'
    ],

    preprocessors: {
      'src/assets/test-index.js': ['webpack', 'sourcemap'],
      'src/materials/elements/favorite-buttons/*.html': ['html2js'],
      'src/materials/modules/modals/*.html': ['html2js'],
      'src/materials/modules/*.html': ['html2js']
    },

    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ]
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome', 'PhantomJS'],

    singleRun: false,

    concurrency: Infinity,

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    junitReporter: {
      outputDir: join(process.env.CIRCLE_TEST_REPORTS || '', 'junit'),
      outputFile: 'test-results.xml',
      useBrowserName: false
    }
  })
}

const fs = require('fs');
const join = require('path').join;
const Promise = require('bluebird');
Promise.promisifyAll(fs);

module.exports = handlebarsLoaderConfig;

/**
 * Responsible for any handlebars loader custom configuration when it cannot
 * be expressed via query parameters
 * @param  {Object} options - Configuration options
 * @param  {Array} options.dirs - Represents the possible directories partials
 * can exist
 * @param  {Array} options.extension - Partial extensions
 * @return {Object} Qualified config object
 */
function handlebarsLoaderConfig(options) {
  return {
    partialResolver: function(request, cb) {
      const filename = request.replace(/\./g, '/');
      const promises = options.dirs.map(function(dir) {
        const partialPath = join(dir, filename + options.extension)
        return fs.accessAsync(partialPath, fs.constants ? fs.constants.F_OK : fs.F_OK)
          .then(function() {
            return partialPath;
          })
          // Allow for rejection to fall through since errors will simply get
          // rejected and will be picked up on build tim
          .catch(function() {});
      });

      Promise
        .all(promises)
        .then(function(filenames) {
          var called = false;
          filenames.forEach(function(filename) {
            if (filename && !called) {
              called = true;
              cb(null, filename);
            }
          });
      });
    }
  };
}

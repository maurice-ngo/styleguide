const assemble = require('fabricator-assemble');
const gaze = require('gaze');
const resolve = require('./path-helpers').resolve;

module.exports = FabricatorPlugin;

function FabricatorPlugin(options) {
  this.options = options;
}

FabricatorPlugin.prototype.apply = function(compile) {
  compile.plugin('run', this.assemble.bind(this));
  compile.plugin('watch-run', this.assemble.bind(this));
  compile.plugin('watch-run', this.watchToBuild.bind(this, compile));
};

FabricatorPlugin.prototype.assemble = function(compiler, callback) {
  assemble(this.options);
  callback();
};

FabricatorPlugin.prototype.watchToBuild = function(compile, compiler, callback) {
  const options = this.options;

  gaze(this.getWatchableGlobs(), function(err) {
    if (err) { throw err; }

    this.on('all', function() {
      assemble(options);

      compile.run(function(err) {
        if (err) { throw err; }
      });
    });
  });

  callback();
};

FabricatorPlugin.prototype.getWatchableGlobs = function() {
  const globs = [];
  const watchableNames = ['layouts', 'layoutIncludes', 'views', 'materials', 'data', 'docs'];

  watchableNames.forEach(function(pattern) {
    if (this.options[pattern]) {
      globs.push(this.options[pattern]);
    }
  }, this);

  return globs;
};

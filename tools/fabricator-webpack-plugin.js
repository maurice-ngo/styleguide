const assemble = require('fabricator-assemble');
const resolve = require('./path-helpers').resolve;

module.exports = FabricatorPlugin;

function FabricatorPlugin(options) {
  this.options = options;
}

FabricatorPlugin.prototype.apply = function(compile) {
  compile.plugin('run', this.assemble.bind(this));
  compile.plugin('watch-run', this.assemble.bind(this));
};

FabricatorPlugin.prototype.assemble = function(compiler, callback) {
  assemble(this.options);
  callback();
};

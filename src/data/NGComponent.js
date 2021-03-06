var NGComponentType = require('./NGComponentType');
var NGBobaLogger = require('../util/NGBobaLogger');
var _ = require('underscore');

module.exports = NGComponent;

/**
 * Container for an angular component
 *
 * @param {String} moduleName
 * @param {NGComponentType} type
 * @param {String} name -  Name of the type generated by the constructor
 * @param {String[]} dependencies - List of all dependencies for the given type
 * @constructor
 */
function NGComponent(moduleName, type, name, dependencies) {
  this.module = moduleName;
  if (!NGComponentType[type.toUpperCase()]) {
    NGBobaLogger.throw(
      'NGCT:TYPE',
      'Invalid component type',
      'Invalid component type: ' + type
    );
  }
  this.type = type;
  this.name = name;
  if (dependencies && !_.isArray(dependencies)) {
    NGBobaLogger.throw(
      'NGCT:DEPS',
      'Invalid component dependencies',
      'Invalid component dependencies: ' + JSON.stringify(dependencies)
    );
  }
  this.dependencies = dependencies || [];
}

NGComponent.prototype = {
  hasDependency: function (name) {
    return _.any(this.dependencies, function (dep) {
      return dep == name;
    });
  },

  setFilePath: function (path) {
    if (this.path && this.path != path) {
      NGBobaLogger.throw(
        'NGCT:DUPE',
        'Duplicate component definition',
        'Duplicate definitions found for ' + this.type + ' "' + this.name + '"',
        [
          'Hey! You are defining ' + this.type + ' "'+this.name+'" multiple times in your project.',
          '',
          'Definition files:',
          this.path,
          path,
          '',
          'To fix this error, remove one of the duplicate definitions listed above.'
        ]
      );
    }
    this.path = path;
  }
};

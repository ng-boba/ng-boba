const NGBobaLogger  = require('../util/NGBobaLogger');
const NGComponent = require('./NGComponent');
const NGComponentType = require('./NGComponentType');
const _ = require('underscore');

module.exports = NGModule;

function NGModule(name, dependencies) {
  NGComponent.call(this, null, NGComponentType.MODULE, name, dependencies);

  // modules have child components
  this.components = {};
}

_.extend(NGModule.prototype, NGComponent.prototype, {
  getComponent: function (name) {
    return this.components[name];
  },

  addComponent: function (component) {
    var name = component.name;
    if (this.components[name]) {
      NGBobaLogger.throw(
        'NGME:REGI',
        'Component already registered',
        'Component already registered with module: ' + name + ', ' + this.components[name] + ', ' + this.name
      );
    }
    this.components[name] = component;
  }
});

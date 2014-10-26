var NGModule = require('../../src/data/NGModule');
var NGComponent = require('../../src/data/NGComponent');
var NGComponentType = require('../../src/data/NGComponentType');
var NGBobaLogger  = require('../../src/util/NGBobaLogger');

describe('NGModule', function () {
  'use strict';

  it('throws error if component is registered multiple times', function () {
    var m = new NGModule('moduleName');
    var c = new NGComponent('moduleName', NGComponentType.DIRECTIVE, 'foo');
    m.addComponent(c);
    expect(function () {
      m.addComponent(c);
    }).toThrow('[NGME:REGI] Component already registered');
  });

});

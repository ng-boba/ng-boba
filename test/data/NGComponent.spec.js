var NGComponent = require('../../src/data/NGComponent');
var NGComponentType = require('../../src/data/NGComponentType');
var _ = require('underscore');
var NGBobaLogger  = require('../../src/util/NGBobaLogger');

describe('NGProject', function () {
  'use strict';

  it('throws error if component path is updated', function () {
    var c = new NGComponent('moduleName', NGComponentType.DIRECTIVE, 'foo');
    c.setFilePath('foo.js');
    expect(function () {
      c.setFilePath('foo2.js');
    }).toThrow('[NGCT:DUPE] Duplicate component definition');
  });

});

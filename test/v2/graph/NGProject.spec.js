
var assert = require('chai').assert;
var expect = require('chai').expect;

var NGProject = require('../../../src/v2/graph/NGProject');
var NGCodeParser = require('../../../src/v2/parser/NGCodeParser');
var TestUtil = require('../../util/TestUtil');
var ParserTools = require('../../../src/v2/parser/ParserTools');

describe('v2/graph/NGProject', function() {

  describe('module parsing', function() {
    var deps = [
      {
        name: 'foo'
      }
    ];
    var p = NGProject.create(deps);
    console.log('proj', p);
    expect(false).to.equal(true);
  });

});


var assert = require('chai').assert;
var expect = require('chai').expect;

var TestUtil = require('../../util/TestUtil');
var ParserTools = require('../../../src/v2/parser/ParserTools');
var NGCodeParser = require('../../../src/v2/parser/NGCodeParser');

describe('v2/parser/ParserTools', function() {

  it('reads files from a folder', function(done) {

    // TODO: parse a static folder
    ParserTools.parseFolder('test/cases').then(function(results) {
      expect(results.length).to.equal(3);
      done();
    }).catch(function(err) {
      throw err;
    }).done();
  });

  it('supports a parser function', function(done) {

    // TODO: parse a static folder
    ParserTools.parseFolder('test/cases', function(contents, filePath) {
      return 'test';
    }).then(function(results) {
      expect(results.length).to.equal(3);
      expect(results[0].results).to.equal('test');
      done();
    }).catch(function(err) {
      throw err;
    }).done();
  });

  it('parses files from a folder', function(done) {

    // TODO: parse a static folder
    ParserTools.parseFolder('test/cases', NGCodeParser.parseCode).then(function(results) {
      expect(results.length).to.equal(3);
      expect(results[0].filePath).to.equal('test/cases/module-definition-multiple.js');
      expect(results[0].results.modules[0].name).to.equal('test1');
      done();
    }).catch(function(err) {
      throw err;
    }).done();
  });

});

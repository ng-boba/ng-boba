
var assert = require('chai').assert;
var expect = require('chai').expect;

var NGCodeParser = require('../../../src/v2/parser/NGCodeParser');
var TestUtil = require('../../util/TestUtil');
var ParserTools = require('../../../src/v2/parser/ParserTools');

describe('v2/parser/NGCodeParser', function() {

  describe('module parsing', function() {

    it('should find single module definition', function(done) {
      TestUtil.readTestCase('module-definition').then(function(code) {
        var parsed = NGCodeParser.parseCode(code);

        expect(parsed.modules.length).to.equal(1);
        expect(parsed.modules[0].name).to.equal('test1');
        expect(parsed.modules[0].dependencies.length).to.equal(2);

        done();
      }).catch(function(err) {
        throw err;
      }).done();
    });

    it('should find multiple module definitions', function(done) {
      TestUtil.readTestCase('module-definition-multiple').then(function(code) {
        var parsed = NGCodeParser.parseCode(code);

        expect(parsed.modules.length).to.equal(3);
        expect(parsed.modules[0].name).to.equal('test1');

        done();
      }).catch(function(err) {
        throw err;
      }).done();
    });

    it('should find mixed modules', function(done) {
      TestUtil.readTestCase('module-mixed').then(function(code) {
        var parsed = NGCodeParser.parseCode(code);

        expect(parsed.modules.length).to.equal(3);
        expect(parsed.modules[2].name).to.equal('test1');
        expect(parsed.modules[1].dependencies.length).to.equal(0);

        done();
      }).catch(function(err) {
        throw err;
      }).done();
    });

  });

});

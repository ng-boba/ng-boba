var ParserTestConfig = require('./ParserTestConfig');
var BobaParserTools = require('../../src/parser/BobaParserTools');

describe('BobaParserTools', function () {
  'use strict';

  beforeEach(function () {

  });

  /**
   * Testing helper to simplify test case creation
   * @param {String} name - name of the test case file, i.e. single-service
   * @param {Function} onParse - callback to invoke after the file is parsed
   */
  function parseTestCase(name, onParse) {
    var path = ParserTestConfig.TEST_CASE_DIRECTORY + name + '.js';
    var $promise = BobaParserTools.parseFile(path);
    var parsedObjects;
    $promise.then(function (fileObject) {
      parsedObjects = fileObject.results;
    });
    waitsFor(function () {
      return !$promise.isPending();
    });
    runs(function () {
      onParse(parsedObjects);
    });
  }

  it('parses a file', function () {
    var path = ParserTestConfig.TEST_CASE_DIRECTORY + 'factory.js';
    var $promise = BobaParserTools.parseFile(path);
    var parsedObjects;
    $promise.then(function (fileObject) {
      parsedObjects = fileObject.results;
    });
    waitsFor(function () {
      return !$promise.isPending();
    });
    runs(function () {
      expect($promise.isRejected()).toBeFalsy();
    });
  });

  it('parses a folder with a trailing slash', function () {
    var $promise = BobaParserTools.parseFolder(ParserTestConfig.TEST_CASE_DIRECTORY);
    var parsedObjects;
    $promise.then(function (fileObject) {
      parsedObjects = fileObject.results;
    });
    waitsFor(function () {
      return !$promise.isPending();
    });
    runs(function () {
      expect($promise.isRejected()).toBeFalsy();
    });
  });

  it('parses a folder without a trailing slash', function () {
    var path = ParserTestConfig.TEST_CASE_DIRECTORY;
    path = path.substr(0, path.length - 1); // remove trailing slash
    var $promise = BobaParserTools.parseFolder(path);
    var parsedObjects;
    $promise.then(function (fileObject) {
      parsedObjects = fileObject.results;
    });
    waitsFor(function () {
      return !$promise.isPending();
    });
    runs(function () {
      expect($promise.isRejected()).toBeFalsy();
    });
  });
});

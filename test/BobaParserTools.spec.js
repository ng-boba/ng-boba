
var BobaParserTools = require('../src/BobaParserTools');

describe('BobaParserTools', function() {
	'use strict';

	beforeEach(function () {

	});

	/**
	 * Testing helper to simplify test case creation
	 * @param {String} name - name of the test case file, i.e. single-service
	 * @param {Function} onParse - callback to invoke after the file is parsed
	 */
	function parseTestCase(name, onParse) {
		var path = 'test/cases/' + name + '.js';
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

	it('parses a file', function() {
		var path = 'test/cases/factory.js';
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

	it('parses a folder with a trailing slash', function() {
		var path = 'test/cases/';
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

	it('parses a folder without a trailing slash', function() {
		var path = 'test/cases';
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

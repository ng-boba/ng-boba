
var ParserTestConfig = require('./ParserTestConfig');
var DependencyParser = require('../../src/parser/NGDependencyParser');
var BobaParserTools = require('../../src/parser/BobaParserTools');

describe('NGDependencyParser', function() {
	'use strict';

	beforeEach(function() {

	});

	/**
	 * Testing helper to simplify test case creation
	 * @param {String} name - name of the test case file, i.e. single-service
	 * @param {Function} onParse - callback to invoke after the file is parsed
	 */
	function parseTestCase(name, onParse) {
		var path = ParserTestConfig.TEST_CASE_DIRECTORY + name +'.js';
		var $promise = BobaParserTools.parseFile(path);
		var parsedObjects;
		$promise.then(function(fileObject) {
			parsedObjects = fileObject.results;
		});
		waitsFor(function() {
			return !$promise.isPending();
		});
		runs(function() {
			onParse(parsedObjects);
		});
	}

	/**
	 * Testing helper
	 * @param deps
	 * @param expectedLength
	 */
	function validateDependencies(o, expectedLength) {
		var dependencies = o.dependencies;
		if (typeof expectedLength !== 'undefined') {
			expect(dependencies.length).toEqual(expectedLength);
		} else {
			expectedLength = dependencies.length;
		}
		for (var i = 0; i < expectedLength; i++) {
			expect(dependencies[i]).toEqual('dep' + (i+1));
		}
	}

	it('fails if file is missing', function() {
		var $promise = BobaParserTools.parseFile('xxxxxxWeeee.dontexist.js');
		waitsFor(function() {
			return !$promise.isPending();
		});
		runs(function() {
			expect($promise.isRejected()).toBeTruthy();
		});
	});

	it('parses module definition', function() {
		parseTestCase('module', function(parsedObjects) {
			expect(parsedObjects.length).toEqual(1);
			var o = parsedObjects[0];
			expect(o.module).toBeNull();
			expect(o.type).toEqual('module');
			expect(o.name).toEqual('test');
			validateDependencies(o, 2);
		});
	});

	it('parses module definition without dependencies', function() {
		parseTestCase('module-nodependencies', function(parsedObjects) {
			expect(parsedObjects.length).toEqual(1);
			var o = parsedObjects[0];
			expect(o.module).toBeNull();
			expect(o.type).toEqual('module');
			expect(o.name).toEqual('test');
			validateDependencies(o, 0);
		});
	});

	it('parses factory without dependencies', function() {
		parseTestCase('factory-nodependencies', function(parsedObjects) {
			expect(parsedObjects.length).toEqual(1);
			var o = parsedObjects[0];
			expect(o.module).toEqual('test');
			expect(o.type).toEqual('factory');
			expect(o.name).toEqual('testFactory');
			validateDependencies(o, 0);
		});
	});

	it('parses factory definition', function() {
		parseTestCase('factory', function(parsedObjects) {
			expect(parsedObjects.length).toEqual(1);
			var o = parsedObjects[0];
			expect(o.module).toEqual('test');
			expect(o.type).toEqual('factory');
			expect(o.name).toEqual('testFactory');
			validateDependencies(o, 2);
		});
	});

	it('parses service definition', function() {
		parseTestCase('service', function(parsedObjects) {
			expect(parsedObjects.length).toEqual(1);
			var o = parsedObjects[0];
			expect(o.module).toEqual('test');
			expect(o.type).toEqual('service');
			expect(o.name).toEqual('TestService');
			validateDependencies(o, 2);
		});
	});

	it('parses controller definition', function() {
		parseTestCase('controller', function(parsedObjects) {
			expect(parsedObjects.length).toEqual(1);
			var o = parsedObjects[0];
			expect(o.module).toEqual('test');
			expect(o.type).toEqual('controller');
			expect(o.name).toEqual('TestController');
			validateDependencies(o, 4);
		});
	});

	it('parses multiple service definitions', function() {
		parseTestCase('services', function(parsedObjects) {
			expect(parsedObjects.length).toEqual(2);
			var o = parsedObjects[0];
			expect(o.module).toEqual('test');
			expect(o.type).toEqual('service');
			expect(o.name).toEqual('TestService');
			validateDependencies(o, 2);

			o = parsedObjects[1];
			expect(o.module).toEqual('test2');
			expect(o.type).toEqual('service');
			expect(o.name).toEqual('TestService2');
			validateDependencies(o, 3);
		});
	});

	it('parses multiple factory definitions', function() {
		parseTestCase('factories', function(parsedObjects) {
			expect(parsedObjects.length).toEqual(2);
			var o = parsedObjects[0];
			expect(o.module).toEqual('test');
			expect(o.type).toEqual('factory');
			expect(o.name).toEqual('testFactory');
			validateDependencies(o, 2);

			o = parsedObjects[1];
			expect(o.module).toEqual('test2');
			expect(o.type).toEqual('factory');
			expect(o.name).toEqual('testFactory2');
			validateDependencies(o, 3);
		});
	});

	it('parses definitions with whitespace', function() {
		parseTestCase('whitespace', function(parsedObjects) {
			expect(parsedObjects.length).toEqual(4);

			var o = parsedObjects[0];
			expect(o.module).toEqual('test1');
			expect(o.type).toEqual('controller');
			expect(o.name).toEqual('TestController');
			validateDependencies(o, 0);

			o = parsedObjects[1];
			expect(o.module).toEqual('test2');
			expect(o.type).toEqual('controller');
			expect(o.name).toEqual('TestController');
			validateDependencies(o, 0);

			o = parsedObjects[2];
			expect(o.module).toEqual('test3');
			expect(o.type).toEqual('controller');
			expect(o.name).toEqual('TestController');
			validateDependencies(o, 0);

			o = parsedObjects[3];
			expect(o.module).toEqual('test4');
			expect(o.type).toEqual('controller');
			expect(o.name).toEqual('TestController');
			validateDependencies(o, 4);
		});
	});

});

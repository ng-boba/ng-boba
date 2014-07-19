
var DependencyParser = require('../src/DependencyParser');

describe('DependencyParser', function() {
	'use strict';

	beforeEach(function() {

	});

	/**
	 * Testing helper to simplify test case creation
	 * @param {String} name - name of the test case file, i.e. single-service
	 * @param {Function} onParse - callback to invoke after the file is parsed
	 */
	function parseTestCase(name, onParse) {
		var path = 'test/cases/'+ name +'.js';
		var $promise = DependencyParser.parseFile(path);
		var parsedObjects;
		$promise.then(function(_parsedObjects) {
			parsedObjects = _parsedObjects;
		});
		waitsFor(function() {
			return !$promise.isPending();
		});
		runs(function() {
			onParse(parsedObjects);
		});
	}

	it('parses single service', function() {
		parseTestCase('single-service', function(parsedObjects) {
			expect(parsedObjects.length).toEqual(1);
			var o = parsedObjects[0];
			expect(o.module).toEqual('single');
			expect(o.type).toEqual('factory');
			expect(o.name).toEqual('rpm');
			expect(o.dependencies.length).toEqual(2);
			expect(o.dependencies[0]).toEqual('firstDependency');
			expect(o.dependencies[1]).toEqual('$resource');
		});
	});

});

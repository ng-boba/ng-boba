
var ShimGenerator = require('../../src/generators/ShimGenerator');

describe('ShimGenerator', function() {
	'use strict';

	it('generates a module shim', function() {
		var deps = [
			'dep1',
			'dep2',
			'dep3'
		];
		var shim;
		var $promise = ShimGenerator.createModuleShim('foo', deps).then(function(_shim) {
			shim = _shim;
		});

		waitsFor(function () {
			return !$promise.isPending();
		});
		runs(function () {
			expect($promise.isRejected()).toBeFalsy();
			expect(shim).toBeDefined();
			expect(shim.indexOf('foo') != -1);
			expect(shim.indexOf('dep3') != -1);
			expect(shim.length).toEqual(48);
		});
	});

	it('generates a factory shim', function() {
		var deps = [
			'dep1',
			'dep2',
			'dep3'
		];
		var files = [
			'test/project/dep1.js',
			'test/project/dep2.js'
		];
		var exports = '$';
		var shim;
		var $promise = ShimGenerator.createFactoryShim('foo', 'fooFactory', files, deps, exports).then(function(_shim) {
			shim = _shim;
		});

		waitsFor(function () {
			return !$promise.isPending();
		});
		runs(function () {
			expect($promise.isRejected()).toBeFalsy();
			expect(shim).toBeDefined();
			expect(shim.indexOf('fooFactory') != -1);
			expect(shim.indexOf('dep3') != -1);
			expect(shim.length).toEqual(219);
		});
	});
});

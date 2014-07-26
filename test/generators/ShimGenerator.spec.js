
var ShimGenerator = require('../../src/generators/ShimGenerator');

describe('ShimGenerator', function() {
	'use strict';

	beforeEach(function () {

	});

//	xit('parses configuration', function() {
//		var g = new ShimGenerator(getMockConfig());
//		expect(g.modules.length).toEqual(3);
//	});

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

	function getMockConfig() {
		return {
			modules: {
				jquery123: {
					files: ['bower_includes/jquery/jquery.1.2.3.js'],
					exports: '$'
				},
				jqueryUi: {
					dependencies: [
						'jquery123'
					],
					files: [
						'bower_includes/jquery-ui/jquery.ui.js',
						'bower_includes/jquery-touch-punch/jquery-touch-punch.js'
					],
					exports: '$'
				},
				backbone: {
					files: ['bower_includes/backbone/backbone.js'],
					dependencies: ['underscore'],
					exports: 'Backbone'
				},
				underscore: {
					files: ['bower_includes/underscore/underscore.js'],
					exports: '_'
				}
			}
		};
	}
});

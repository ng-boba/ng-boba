
var BobaShimTools = require('../src/BobaShimTools');

describe('BobaShimTools', function() {
	'use strict';

	it('parses configuration', function() {

		// TODO: implementation shim specific configuration parsing
	});

	function getMockConfig() {
		return {
			outputDirectory: 'bin',
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

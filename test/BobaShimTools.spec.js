
var BobaShimTools = require('../src/BobaShimTools');

describe('BobaShimTools', function() {
	'use strict';

	it('parses configuration', function() {

		BobaShimTools.parseConfig(getMockConfig());
		// TODO: implementation shim specific configuration parsing
	});

	function getMockConfig() {
		return {
			outputDirectory: 'bin',
			modules: {
				jquery: {
					files: ['bower_components/jquery/dist/jquery.js'],
					exports: '$'
				},
				backbone: {
					files: ['bower_components/backbone/backbone.js'],
					dependencies: ['underscore'],
					exports: 'Backbone'
				},
				underscore: {
					files: ['bower_components/underscore/underscore.js'],
					exports: '_'
				},
				bootstrap: {
					files: ['bower_components/bootstrap/dist/js/bootstrap.js'],
					dependencies: ['jquery']
				}
			}
		};
	}
});

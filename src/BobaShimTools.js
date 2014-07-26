/**
 * Utility methods for generating angular shims
 */
var fs = require('fs');
var $q = require('q');

module.exports = {
	parseConfig: parseConfiguration
};

function parseConfiguration(configuration) {

	// TODO: implement configuration parsing here
	var modules = configuration.modules || {};
	Object.keys(modules).forEach(function(dependencyName) {

		// TODO: fill out existing file/dep stucture with information from config
//		var n = new NGNode({
//			filePath: 'foo/generated/file',
//			dependencies: [
//				'jquery123'
//			]
//		});
	});
	return [];
}

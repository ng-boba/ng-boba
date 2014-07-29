
var NGObjectDetails = require('../../src/data/NGObjectDetails');
var NGObjectType = require('../../src/data/NGObjectType');

module.exports = {
	getDependencies: getDependencies
};

function getDependencies(setName) {
	switch (setName) {

		// one to one dependencies
		default:
		case '121':
			return [
				{
					filePath: 'file1.js',
					results: [
						new NGObjectDetails(null, NGObjectType.MODULE, 'main', [
							'moduleIncluded'
						])
					]
				},
				{
					filePath: 'file2.js',
					results: [
						new NGObjectDetails('moduleIncluded', NGObjectType.DIRECTIVE, 'awesomeDirective', [

						])
					]
				},
				{
					filePath: 'file3.js',
					results: [
						new NGObjectDetails('moduleExcluded', NGObjectType.CONTROLLER, 'ExcludedController', [

						])
					]
				}
			];

		case 'moduleIncluded':
			return [
				{
					filePath: 'file1.js',
					results: [
						new NGObjectDetails(null, NGObjectType.MODULE, 'main', [
							'moduleIncluded'
						])
					]
				},
				{
					filePath: 'file2.js',
					results: [
						new NGObjectDetails('moduleIncluded', NGObjectType.DIRECTIVE, 'awesomeDirective', [

						])
					]
				},
				{
					filePath: 'file3.js',
					results: [
						new NGObjectDetails('moduleIncluded', NGObjectType.CONTROLLER, 'IncludedController', [

						])
					]
				}
			];

	}
}

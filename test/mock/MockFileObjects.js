
var NGComponent = require('../../src/data/NGComponent');
var NGComponentType = require('../../src/data/NGComponentType');

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
						new NGComponent(null, NGComponentType.MODULE, 'main', [
							'moduleIncluded'
						])
					]
				},
				{
					filePath: 'file2.js',
					results: [
						new NGComponent('moduleIncluded', NGComponentType.DIRECTIVE, 'awesomeDirective', [

						])
					]
				},
				{
					filePath: 'file3.js',
					results: [
						new NGComponent('moduleExcluded', NGComponentType.CONTROLLER, 'ExcludedController', [

						])
					]
				}
			];

		case 'moduleIncluded':
			return [
				{
					filePath: 'file1.js',
					results: [
						new NGComponent(null, NGComponentType.MODULE, 'main', [
							'moduleIncluded'
						])
					]
				},
				{
					filePath: 'file2.js',
					results: [
						new NGComponent('moduleIncluded', NGComponentType.DIRECTIVE, 'awesomeDirective', [

						])
					]
				},
				{
					filePath: 'file3.js',
					results: [
						new NGComponent('moduleIncluded', NGComponentType.CONTROLLER, 'IncludedController', [

						])
					]
				}
			];

	}
}

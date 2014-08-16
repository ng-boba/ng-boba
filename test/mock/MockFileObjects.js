
var NGModule = require('../../src/data/NGModule');
var NGComponent = require('../../src/data/NGComponent');
var NGComponentType = require('../../src/data/NGComponentType');

module.exports = {
	getDependencies: getDependencies
};

function getDependencies(setName) {
	switch (setName) {
		default:
		case 'basicProject':
			return [
				{
					filePath: 'file1.js',
					results: [
						new NGModule('main', [
							'moduleIncluded'
						])
					]
				},
				{
					filePath: 'file2.js',
					results: [
						new NGModule('moduleIncluded'),
						new NGComponent('moduleIncluded', NGComponentType.DIRECTIVE, 'awesomeDirective')
					]
				},
				{
					filePath: 'file3.js',
					results: [
						new NGComponent('moduleExcluded', NGComponentType.CONTROLLER, 'ExcludedController')
					]
				}
			];

		case 'allModuleFilesIncluded':
			return [
				{
					filePath: 'file1.js',
					results: [
						new NGModule('main', [
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
				},
				{
					filePath: 'file4.js',
					results: [
						new NGModule('moduleIncluded')
					]
				}
			];

		case 'deepTree':
			return [
				{
					filePath: 'file1.js',
					results: [
						new NGModule('main', [
							'depModule1'
						]),
						new NGModule('depModule1', ['depModule2']),
						new NGModule('depModule2', [])
					]
				},
				{
					filePath: 'file2.js',
					results: [
						new NGComponent('depModule2', NGComponentType.DIRECTIVE, 'child2', ['child3'])
					]
				},
				{
					filePath: 'file3.js',
					results: [
						new NGComponent('depModule2', NGComponentType.DIRECTIVE, 'child3', ['child4'])
					]
				},
				{
					filePath: 'file4.js',
					results: [
						new NGComponent('depModule2', NGComponentType.DIRECTIVE, 'child4', ['child5'])
					]
				},
				{
					filePath: 'file5.js',
					results: [
						new NGComponent('depModule2', NGComponentType.DIRECTIVE, 'child5')
					]
				}
			];

		// error case
		case 'missingModule':
			return [
				{
					filePath: 'file1.js',
					results: [
						new NGModule('main', [
							'missingModule'
						])
					]
				}
			];

		// error case
		case 'missingModuleDefinition':
			return [
				{
					filePath: 'file1.js',
					results: [
						new NGModule('main', [
							'missingModule'
						])
					]
				},
				{
					filePath: 'file2.js',
					results: [
						new NGComponent('missingModule', NGComponentType.DIRECTIVE, 'awesomeDirective')
					]
				}
			];

		// error case
		case 'missingModuleDependencies':
			return [
				{
					filePath: 'file1.js',
					results: [
						new NGModule('main', [
							'missingModule'
						])
					]
				},
				{
					filePath: 'file2.js',
					results: [
						new NGComponent('main', NGComponentType.DIRECTIVE, 'awesomeDirective')
					]
				}
			];
	}
}

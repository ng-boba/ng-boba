
var NGModule = require('../../src/data/NGModule');
var NGComponent = require('../../src/data/NGComponent');
var NGComponentType = require('../../src/data/NGComponentType');

module.exports = {
	getDependencies: getDependencies
};

function getDependencies(setName) {
	switch (setName) {

		// one to one dependencies
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
	}
}

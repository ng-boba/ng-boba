
var argv = require('minimist')(process.argv.slice(2));

console.log('Welcome to ng-boba');
console.log('-------------------------------');
console.log('Main arguments: ', argv);

/**
 * @option modules - comma separated list of modules to bundle together
 * @example --modules=app, extras
 */
var modules = argv.modules;
if (!modules) {
	throw 'Must specify at least one module!';
}
modules = modules.split(',');

/**
 * Main
 * @type {exports}
 */
var BobaParserTools = require('./BobaParserTools');
var GDependencyGraph = require('./GDependencyGraph');

var filePath = "test/cases/";
var result = BobaParserTools.parseFolder(filePath);
// var result = BobaParserTools.parseFile('test/cases/module-definition-with-controller.js');

result.then(function(dependencies) {
	console.log('found deps', dependencies);

	// create a list of files
	var g = new GDependencyGraph(dependencies);
	var files = g.getBundleFiles(modules[0]);

	console.log('');
	console.log('ggggggggggggggggggggggggggggggggggg');
	console.log('');
	console.log('Generated bundle files:', files);
}).done(function() {
	console.log(arguments);
});

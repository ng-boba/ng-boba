
var argv = require('minimist')(process.argv.slice(2));

console.log('\nng-boba\n');

/**
 * @option modules - comma separated list of modules to bundle together
 * @example --modules=app, extras
 */
var modules = argv.modules;
if (!modules) {
	throw 'Must specify at least one module! Example: node main.js --modules=foo';
}
modules = modules.split(',');

/**
 * Main
 * @type {exports}
 */
var BobaParserTools = require('./BobaParserTools');
var GDependencyGraph = require('./GDependencyGraph');
var jNodeLoop = require('./jNodeLoop');

var filePath = "test/cases/";
var result = BobaParserTools.parseFolder(filePath);

result.then(function(dependencies) {
	console.log('Dependencies:\n', dependencies);

	jNodeLoop(dependencies);

	// create a list of files
	var g = new GDependencyGraph(dependencies);
	var files = g.getBundleFiles(modules[0]);

	console.log('\nGDependencyGraph, bundle files:\n', files, '\n');

}).done(function(err) {
	if (err) {
		console.log(arguments);
	}
});

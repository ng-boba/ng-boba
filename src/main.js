
var argv = require('minimist')(process.argv.slice(2));

console.log('\nng-boba\n');

/**
 * @option modules - comma separated list of modules to bundle together
 * @example --modules=app, extras
 */
//var modules = argv.modules;
//if (!modules) {
//	throw 'Must specify at least one module! Example: node main.js --modules=foo';
//}
//modules = modules.split(',');
//
/**
 * Main
 * @type {exports}
 */
var BobaParserTools = require('./BobaParserTools');
var NGDependencyGraph = require('./data/NGDependencyGraph');

var NGProject = require('./data/NGProject');
var jNodeLoop = require('./jNodeLoop');

var filePath = "test/project/";
var result = BobaParserTools.parseFolder(filePath);

/**
 * Enables shimming additional libraries as needed
 */
// TODO: see BobaShimTools.spec.js for a larger shim configuration example
var sampleConfig = {
	modules: {
		jquery123: {
			dependencies: [
			],
			files: [
				'src/jquery'
			]
		},
		jqueryUI: {
			files: [
				'src/jquery.ui'
			],
			dependencies: [
				'jquery'
			]
		}
	}
};

result.then(function(parsedFiles) {
	console.log('Dependencies:\n', parsedFiles);

	jNodeLoop(parsedFiles);

	// create a list of files
//	var g = new NGDependencyGraph();
	var project = new NGProject();

	parsedFiles.forEach(function(fileObject) {
		project.addFileComponents(fileObject.filePath, fileObject.results);
//		g.addFileComponents(fileObject.filePath, fileObject.results);
	});

	console.log('');
	console.log('Generated project graph');
	console.log(project.getBundleFiles('jModule'));
	return;
	//var files = g.getBundleFiles(modules[0]);

	console.log('\nGDependencyGraph, bundle files:\n', files, '\n');

}).done(function(err) {
	if (err) {
		console.log(arguments);
	}
});

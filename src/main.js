
var argv = require('minimist')(process.argv.slice(2));

console.log('Welcome to ng-boba');
console.log('-------------------------------');
console.log('Main arguments: ', argv);

/**
 * @option modules - comma separated list of modules to bundle together
 * @example --modules=app, extras
 */
var modules = argv.modules;


/**
 * Main
 * @type {exports}
 */
var BobaParserTools = require('./BobaParserTools');

var filePath = "test/cases/";
var result = BobaParserTools.parseFolder(filePath);
// var result = BobaParserTools.parseFile('test/cases/module-definition-with-controller.js');

result.then(function(dependencies) {
	console.log('found deps', dependencies);
}).catch(function() {
	console.log('something broke');
})

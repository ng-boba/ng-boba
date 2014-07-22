
var BobaParserTools = require('./BobaParserTools');
var argv = require('minimist')(process.argv.slice(2));

console.log('Got arguments!', argv);

var filePath = "test/cases";
var result = BobaParserTools.parseFolder(filePath);
// var result = BobaParserTools.parseFile('test/cases/module-definition-with-controller.js');

result.then(function(dependencies) {
	console.log(dependencies);
});

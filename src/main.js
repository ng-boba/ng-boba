
var angular = require('angular');
var DependencyParser = require('./DependencyParser');

var result = DependencyParser.parseFile('test/cases/multiple-services.js');
result.then(function(dependencies) {
	// console.log('Parsed dependencies from a file', dependencies);
});

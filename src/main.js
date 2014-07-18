
var angular = require('angular');
var DependencyParser = require('./DependencyParser');

var result = DependencyParser.parseFile('test/cases/module-definition-with-controller.js');
result.then(function(dependencies) {
	// console.log('Parsed dependencies from a file', dependencies);
});

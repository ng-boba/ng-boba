
var angular = require('angular');
var DependencyParser = require('./DependencyParser');

// var result = DependencyParser.parseFile('test/cases/module-definition-with-controller.js');

var filePath = "test/cases";
var result = DependencyParser.parseFolder(filePath);

var nodes = [];

result.then(function(dependencies) {
	console.log('Nodes: ', nodes);
});

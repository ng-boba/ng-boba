
var angular = require('angular');
var DependencyParser = require('./DependencyParser');



var filePath = "test/cases";
var result = DependencyParser.parseFolder(filePath);
// var result = DependencyParser.parseFile('test/cases/module-definition-with-controller.js');


result.then(function(dependencies) {
	console.log(dependencies);
});

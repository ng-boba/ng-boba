
var angular = require('angular');
var DependencyParser = require('./DependencyParser');
var jNodeLoop = require('./jNodeLoop');


var filePath = "test/project";
var result = DependencyParser.parseFolder(filePath);
// var result = DependencyParser.parseFile('test/cases/module-definition-with-controller.js');


result.then(function(dependencies) {
	jNodeLoop(dependencies);
}).done(function() {
	// console.log(arguments);
});

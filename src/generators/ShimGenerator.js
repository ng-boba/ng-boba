/**
 * Yup.
 * @type {ShimGenerator}
 */
var _ = require('underscore');
var $q = require('q');
var fs = require('fs');

module.exports = {
	createModuleShim: createModuleShim,
	createFactoryShim: createFactoryShim
};


function createModuleShim(moduleName, dependencies) {
	var stringDependencies = _.map(dependencies, function(dep) {
		return "'" + dep + "'";
	});
	var templateData = {
		moduleName: moduleName,
		dependencies: stringDependencies.join(',')
	};
	return renderTemplate('src/generators/module.tmpl', templateData);
}

function createFactoryShim(moduleName, factoryName, files, dependencies, exports) {
	var deferred = $q.defer();
	var fileContents = [];
	if (files.length < 0) {
		throw 'No shim files specified';
	}
	files.forEach(function(filePath) {
		fileContents.push(getFileContents(filePath));
	});
	$q.spread(fileContents, function() {
		var factoryCode = _.toArray(arguments).join('\n\n');
		var stringDependencies = _.map(dependencies, function(dep) {
			return "'" + dep + "'";
		});
		var templateData = {
			factoryCode: factoryCode,
			moduleName: moduleName,
			factoryName: factoryName,
			dependencies: stringDependencies.join(','),
			exports: exports || '{}'
		};
		renderTemplate('src/generators/factory.tmpl', templateData).then(function(s) {
			deferred.resolve(s);
		});
	}).catch(function() {
		console.log("Could not parse the thing!", arguments);
		deferred.reject();
	});
	return deferred.promise;
}

function renderTemplate(filePath, data) {
	var deferred = $q.defer();
	getFileContents(filePath).then(function(contents) {
		var s = _.template(contents, data);
		deferred.resolve(s);
	}).catch(function() {
		deferred.reject('Could not render template: ' + filePath);
	});
	return deferred.promise;
}

function getFileContents(filePath) {
	var deferred = $q.defer();
	fs.readFile(filePath, 'utf8', function (err, contents) {
		if (err) {
			deferred.reject(err);
			return;
		}
		deferred.resolve(contents);
	});
	return deferred.promise;
}

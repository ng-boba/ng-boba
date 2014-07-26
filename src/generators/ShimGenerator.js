/**
 * Yup.
 * @type {ShimGenerator}
 */
var _ = require('underscore');
var $q = require('q');
var fs = require('fs');
var NGObjectType = require('../NGObjectType');
var NGNode = require('../NGNode');

module.exports = ShimGenerator;

/**
 * Takes a shim module configuration to generate modules for inclusion
 * @param {Object} configuration
 * @constructor
 */
function ShimGenerator(configuration) {
	this.modules = parseConfiguration(configuration);
}

ShimGenerator.createModuleShim = function(moduleName, dependencies) {
	var stringDependencies = _.map(dependencies, function(dep) {
		return "'" + dep + "'";
	});
	var templateData = {
		moduleName: moduleName,
		dependencies: stringDependencies.join(',')
	};
	return renderTemplate('src/generators/module.tmpl', templateData);
};

ShimGenerator.createFactoryShim = function(moduleName, factoryName, files, dependencies, exports) {
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
};

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

function parseConfiguration(configuration) {
	var modules = configuration.modules || {};
	Object.keys(modules).forEach(function(dependencyName) {

		// TODO: fill out existing file/dep stucture with information from config
		var n = new NGNode({
			filePath: 'foo/generated/file',
			dependencies: [
				'jquery123'
			]
		});
	});
	return [];
}

ShimGenerator.prototype = {

	/**
	 * Creates the files from the modules configuration
	 * @param {String} outputDirectory
	 * @returns
	 */
	createModules: function(outputDirectory) {
		throw 'Not implemented';
	}
};

/**
 * Handles associating the angular components and modules
 * @type {NGProject}
 */
const NGComponentType = require('./NGComponentType');
const NGComponent = require('./NGComponent');
const NGModule = require('./NGModule');
const _ = require('underscore');

module.exports = NGProject;

/**
 * Creates a graph representation of the file object dependencies
 * @param {String} name - project name
 * @constructor
 */
function NGProject(name) {
	this.name = name
	this.modules = {};
	this.baseDependencies = [];
}

NGProject.prototype = {

	/**
	 * Base dependencies are libraries that are required outside of the
	 * angular framework. This might be jquery, underscore, etc
	 * @param {String} filePath
	 */
	addBaseDependency: function(filePath) {
		this.baseDependencies.push(filePath);
	},

	/**
	 * Adds components to the project
	 * @param {String} filePath
	 * @param {NGComponent} components
	 */
	addFileComponents: function(filePath, components) {
		components.forEach(function(c) {
			var ngModule;
			switch (c.type) {
				case NGComponentType.MODULE:
					ngModule = this.getModule(c.name);
					ngModule.dependencies = c.dependencies;
					ngModule.setFilePath(filePath);
					break;

				// TODO: catch other types that are unsupported
				default:
					ngModule = this.getModule(c.module);
					c.setFilePath(filePath);
					ngModule.addComponent(c);
					break;
			}
		}, this);
	},

	/**
	 * If filePath is provided, then it is assumed to be the file containing the module
	 * @param name
	 * @param filePath (optional)
	 */
	getModule: function(name) {
		var ngModule = this.modules[name];
		if (!ngModule) {
			ngModule = this.modules[name] = new NGModule(name);
		}
		return ngModule;
	},

	/**
	 * Simple getter to return all the module names
	 * @returns {Array}
	 */
	getModuleNames: function() {
		return Object.keys(this.modules);
	},

	/**
	 * Retrieves the dependencies required for a file
	 * @param {String} moduleName
	 * @param {Array} ignoreMissingModules (optional) - if provided, these modules will not generate missing errors
	 * @returns {String[]}
	 */
	getBundleFiles: function(moduleName, ignoreMissingModules) {
		var rootModule = this.modules[moduleName];
		if (!rootModule) {
			console.error('Missing module:', moduleName);
			throw 'Missing module';
		}

		// convert missing modules to hash for quick lookup
		var ignoreModules = {};
		(ignoreMissingModules || []).forEach(function(name) {
			ignoreModules[name] = true;
		});

		var files = [];
		traverseModule(this, rootModule, ignoreModules, files);

		// include base dependencies
		files.unshift.apply(files, this.baseDependencies);

		return _.uniq(files);
	}
};

function traverseModule(project, ngModule, ignoreModules, files) {

	// trace all the module dependencies
	for (var i = 0; i < ngModule.dependencies.length; i++) {
		var depModuleName = ngModule.dependencies[i];
		var depModule = project.modules[depModuleName];
		if (!depModule) {
			if (ignoreModules[depModuleName]) {
				continue;
			}
			console.error('Missing module:', depModuleName);
			throw 'Missing module';
		}
		traverseModule(project, depModule, ignoreModules, files);
	}

	// TODO: include additional rules for config & provider, etc
	// include the module before dependencies
	files.push(ngModule.path);

	Object.keys(ngModule.components).forEach(function(name) {
		var component = ngModule.components[name];
		files.push(component.path);
	});
	if (!ngModule.path) {
		console.error('Missing module definition:', ngModule.name);
		throw 'Missing module definition';
	}
}

/**
 * Handles associating the angular components and modules
 * @type {NGProject}
 */
const NGComponentType = require('./NGComponentType');
const NGComponent = require('./NGComponent');
const NGModule = require('./NGModule');
//var NGNode = require('./NGNode');

module.exports = NGProject;

/**
 * Creates a graph representation of the file object dependencies
 * @param fileObjects
 * @constructor
 */
function NGProject() {
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

	addFileComponents: function(filePath, components) {
		components.forEach(function(c) {
			var module;
			switch (c.type) {
				case NGComponentType.MODULE:
					module = this.getModule(c.name);
					module.dependencies = c.dependencies;
					module.setFilePath(filePath);
					break;

				// TODO: catch other types that are unsupported
				default:
					module = this.getModule(c.module);
					c.setFilePath(filePath);
					module.addComponent(c);
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
		var module = this.modules[name];
		if (!module) {
			module = this.modules[name] = new NGModule(null, NGComponentType.MODULE, name);
		}
		return module;
	},

	/**
	 * Retrieves the dependencies required for a file
	 * @param {String} module
	 * @returns {String[]}
	 */
	getBundleFiles: function(moduleName) {
		var rootModule = this.modules[moduleName];
		if (!rootModule) {
			throw 'Could not locate the file for module: ' + moduleName;
		}
		var files = [];

		// trace all the module dependencies
		for (var i = 0; i < rootModule.dependencies.length; i++) {
			var depModuleName = rootModule.dependencies[i];
			var depModule = this.modules[depModuleName];
			if (!depModule) {
				throw 'Could not find module: ' + depModuleName;
			}
			modulePostOrder(depModule, files);
		}
		modulePostOrder(rootModule, files);

		// include base dependencies
		files.unshift.apply(files, this.baseDependencies);

		return files;
	}
};

function modulePostOrder(depModule, files) {
	Object.keys(depModule.components).forEach(function(name) {
		var component = depModule.components[name];
		files.push(component.path);
	});
	files.push(depModule.path);
}

function postOrderTraversal(node, files) {
	for (var i = 0, iM = node.edges.length; i < iM; i++) {
		postOrderTraversal(node.edges[i], files);
	}
	files.push(node.id);
}

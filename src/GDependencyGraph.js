/**
 * Yup.
 * @type {DependencyGraph}
 */
var NGObjectType = require('./NGObjectType');
module.exports = DependencyGraph;

/**
 * Creates a graph representation of the file object dependencies
 * @param fileObjects
 * @constructor
 */
function DependencyGraph(fileObjects) {
	var nodes = this._nodes = convertToNodes(fileObjects);
	linkNodes(nodes);
}

/**
 * Simple graph node object
 * @param fileObject
 * @constructor
 */
function GraphNode(fileObject) {
	this.id = fileObject.filePath;
	this.fileObject = fileObject;

	// serialize the parsed objects into a lookup table
	var components = this.components = {};
	var objects = this.fileObject.results;
	objects.forEach(function(o) {
		components[o.module] = true;
		components[o.name] = true;
	}, this);

	// serialize the parsed object dependencies into a lookup table
	var dependencies = this.dependencies = {};
	var objects = this.fileObject.results;
	objects.forEach(function(o) {
		o.dependencies.forEach(function(name) {
			dependencies[name] = true;
		}, this);
	}, this);

	// we don't link yet!
	this.edges = [];
}

GraphNode.prototype = {
};

/**
 * Accepts an array of file objects and generates an array of nodes
 * @param fileObjects
 * @returns {Array}
 */
function convertToNodes(fileObjects) {
	var nodes = this._nodes = [];
	fileObjects.forEach(function(fileObject, index) {

		// we need to convert the file object into a node
		var node = new GraphNode(fileObject);
		nodes.push(node);
	});
	return nodes;
}

/**
 * Iterates over the nodes and creates directed links between files
 * @param nodes
 */
function linkNodes(nodes) {

	// now that we have the nodes, let's find all the edges
	for (var i = 0; i < nodes.length - 1; i++) {
		var n1 = nodes[i];
		for (var j = i+1; j < nodes.length; j++) {
			var n2 = nodes[j];
			if (n1.id == n2.id) {
				continue;
			}

			Object.keys(n1.dependencies).forEach(function(name) {
				if (n2.components[name]) {

					// TODO: validate that the node is not linked already!
					n1.edges.push(n2);
				}
			});
		}
	}
}

DependencyGraph.prototype = {

	/**
	 * Retrieves the dependencies required for a file
	 * @param {String} module
	 * @returns {String[]}
	 */
	getBundleFiles: function(module) {
		var rootNode;
		for (var i = 0; i < this._nodes.length; i++) {
			if (this._nodes[i].components[module]) {
				rootNode = this._nodes[i];
				break;
			}
		}
		if (!rootNode) {
			throw 'Could not locate the file for module: ' + module;
		}

		var files = [];
		postOrderTraversal(rootNode, files);
		return files;
	}
};

// TODO: remove this fancy?
Object.defineProperties(DependencyGraph.prototype, {
	'nodes': {
		get: function() {
			return this._nodes;
		}
	}
});

function postOrderTraversal(node, files) {
	for (var i = 0, iM = node.edges.length; i < iM; i++) {
		postOrderTraversal(node.edges[i], files);
	}
	files.push(node.id);
}

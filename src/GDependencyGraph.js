/**
 * Yup.
 * @type {DependencyGraph}
 */
var NGObjectType = require('./NGObjectType');
var NGNode = require('./NGNode');
module.exports = DependencyGraph;

/**
 * Creates a graph representation of the file object dependencies
 * @param fileObjects
 * @constructor
 */
function DependencyGraph(fileObjects, configuration) {
	var nodes = this._nodes = convertToNodes(fileObjects);
	linkNodes(nodes);
}

/**
 * Accepts an array of file objects and generates an array of nodes
 * @param fileObjects
 * @returns {Array}
 */
function convertToNodes(fileObjects) {
	var nodes = this._nodes = [];
	fileObjects.forEach(function(fileObject, index) {

		// we need to convert the file object into a node
		var node = new NGNode(fileObject);
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
	for (var i = 0; i < nodes.length; i++) {
		var n1 = nodes[i];
		for (var j = 0; j < nodes.length; j++) {
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
			if (this._nodes[i].components['module.' + module]) {
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

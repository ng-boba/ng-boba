/**
 * Yup.
 * @type {DependencyGraph}
 */
module.exports = DependencyGraph;

/**
 * Creates a graph representation of the file object dependencies
 * @param fileObjects
 * @constructor
 */
function DependencyGraph(fileObjects) {

	// TODO: create nodes in the graph for each of the file objects
	this._nodes = parseObjects(fileObjects);
}

function parseObjects(objects) {
	objects.forEach(function() {
		console.log('parsing a thing', arguments);
	});
}

DependencyGraph.prototype = {

	/**
	 * Retrieves the dependencies required for a file
	 * @param {String} module
	 * @returns {String[]}
	 */
	getBundleFiles: function(module) {
		throw 'No bundle!';
	}
};

Object.defineProperties(DependencyGraph.prototype, {
	'nodes': {
		get: function() {
			return this._nodes;
		}
	}
});

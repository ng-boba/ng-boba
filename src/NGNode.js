
module.exports = GraphNode;

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

		if (o.module) {
			components[o.module] = true;
			components[o.name] = true;
		} else {

			// special handling for module definitions
			components[o.type + '.' + o.name] = true;
		}

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

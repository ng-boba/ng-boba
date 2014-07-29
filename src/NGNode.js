
module.exports = NGFileNode;

/**
 * Simple graph node object representing a single file on the filesystem
 * @param {String} filePath
 * @param {Object} fileComponents
 * @constructor
 */
function NGFileNode(filePath, fileComponents) {
	this.id = filePath;

	// serialize the parsed objects into a lookup table
	this.components = {};
	fileComponents.forEach(function(fc) {
		if (fc.module) {
			this.components[fc.module] = true;
			this.components[fc.name] = true;
		} else {

			// special handling for module definitions
			this.components[fc.type + '.' + fc.name] = true;
		}
	}, this);

	// serialize the parsed object dependencies into a lookup table
	this.dependencies = {};
	fileComponents.forEach(function(fc) {
		fc.dependencies.forEach(function(name) {
			this.dependencies[name] = true;
		}, this);
	}, this);

	// we don't link yet!
	this.edges = [];
}

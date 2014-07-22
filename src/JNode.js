var JNode = function(fileName, moduleName, dependencies) {
	this.fileName = fileName;
	this.moduleName = moduleName;
	this.dependencies = dependencies;
};

module.exports = JNode;

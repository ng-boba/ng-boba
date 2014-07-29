
module.exports = NGModule;

function NGModule(name) {
	this.components = {};
	this.files = [];
}

NGModule.prototype = {
	addComponent: function(name, filePath) {
		if (this.components[name]) {
			throw 'Component already registered with module!';
		}
		this.components[name] = filePath;
	}
};

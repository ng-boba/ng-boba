var JNode = require('./JNode');

var jNodeLoop = function(dependencies) {
	//The order the files need to be loaded
	var fileOrder = [];

	//Convert to fileObject to jNode Structure
	var jNodes = []
	//all of a file's dependencies
	for (var di = 0; di < dependencies.length; di++) {
		// console.log(di);
	
		//a file can have multiple items defined
		for (var ri = 0; ri < dependencies[di].results.length; ri++) {

			var filePath = dependencies[di].filePath;
			var jNode = new JNode(filePath, dependencies[di].results[ri].name, dependencies[di].results[ri].dependencies);
			jNodes.push(jNode);
		}
	}	

	//Get the Modules
	var requestedModule = 'jModule';
	var getModules = function (requestedModules) {
		var depsNeeded = [];	
		for (var i = 0; i < jNodes.length; i++) {
	
			//Find the requested module

			for (var rmi = 0; rmi < requestedModules.length; rmi++) {
				if (jNodes[i].moduleName == requestedModules[rmi]) {
					fileOrder.unshift(jNodes[i].fileName);

					for (var ji = 0; ji < jNodes[i].dependencies.length; ji++) {
						if (jNodes[i].dependencies[ji]) {
							depsNeeded.push(jNodes[i].dependencies[ji]);
						}
						
						
					}
				}	
			}
		}
		if (depsNeeded.length > 0) {
			getModules(depsNeeded);
		}
	}

	for (var i = 0; i < jNodes.length; i++) {
		var depsNeeded = [];	
		//Find the root module
		if (jNodes[i].moduleName == requestedModule) {

			fileOrder.push(jNodes[i].fileName);

			for (var ji = 0; ji < jNodes[i].dependencies.length; ji++) {
				depsNeeded.push(jNodes[i].dependencies[ji]);
				
			}
			getModules(depsNeeded);
		}	
	}
	console.log(fileOrder);
}

module.exports = jNodeLoop;
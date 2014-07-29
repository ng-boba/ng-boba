
var fs = require('fs');
var file = 'boba-config.json';

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
  var jsonConfig = JSON.parse(data);
  addBoba(jsonConfig);
})


var BobaParserTools = require('./BobaParserTools');
var NGDependencyGraph = require('./NGDependencyGraph');
function addBoba(config) {
	var jsonConfig = config;
	if (!jsonConfig) {
		throw ('Boba needs a config to run.');
	}

	if (!jsonConfig.folder && !jsonConfig.files) {
		throw ('Add files or folder option to your config');
	}

	if (jsonConfig.folder && jsonConfig.files) {
		throw ('Both files and folder options cannot be specified.  Choose one.');
	}

	if (!jsonConfig.modules || jsonConfig.modules.length == 0) {
		throw ('Specify one or more angular modules.');
	}

	if (jsonConfig.folder) {
		BobaParserTools.parseFolder(jsonConfig.folder).then(function(dependencies) {
			
			var g = new NGDependencyGraph(dependencies, {});
			var files = g.getBundleFiles(jsonConfig.modules[0]);
			console.log(files);
			return files;
		})

	}
}

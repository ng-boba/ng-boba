
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
var NGProject = require('./data/NGProject');

function addBoba(config) {
	if (!config) {
		throw ('Boba needs a config to run.');
	}

	if (!config.folder && !config.files) {
		throw ('Add files or folder option to your config');
	}

	if (config.folder && config.files) {
		throw ('Both files and folder options cannot be specified.  Choose one.');
	}

	if (!config.modules || config.modules.length == 0) {
		throw ('Specify one or more angular modules.');
	}

	if (config.folder) {

		BobaParserTools.parseFolder(config.folder).then(function(parsedFiles) {

			var project = new NGProject();
			parsedFiles.forEach(function(fileObject) {
				project.addFileComponents(fileObject.filePath, fileObject.results);
			});
			var files = project.getBundleFiles(config.modules[0]);
			console.log(files);
			return files;
		})

	}
}

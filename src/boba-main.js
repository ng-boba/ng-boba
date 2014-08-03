
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var BobaParserTools = require('./parser/BobaParserTools');
var NGProject = require('./data/NGProject');

// output the argv details
//console.dir(argv);

var file = argv.config ? argv.config : 'boba-config.json';

// stores all the configuration for ng-boba
var config;
fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
	config = JSON.parse(data);
  addBoba();
});

function addBoba() {
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

	if (config.output) {

		// TODO: validate that the output file is empty
	}

	if (config.folder) {
		BobaParserTools.parseFolder(config.folder).then(handleParsedFiles).done();
	} else if (config.files) {
		throw 'Not implemented';
	}
}

function handleParsedFiles(parsedFiles) {
	var project = new NGProject();
	parsedFiles.forEach(function(fileObject) {
		project.addFileComponents(fileObject.filePath, fileObject.results);
	});

	config.dependencies.forEach(function(dependency) {
		project.addBaseDependency(dependency);
	});

	var files = project.getBundleFiles(config.modules[0]);
	outputFiles(files);
}

function outputFiles(files) {
	var s = JSON.stringify(formatOutput(files));

	if (config.output) {

		// write the file list to file
		fs.writeFile(config.output, s, function(err) {
			if (err) {
				return;
			}
		});
		return;
	}

	// simple output
	console.log(files);
}

/**
 * Creates the output envelope for the file list
 * @param {Array} files
 * @returns {Object}
 */
function formatOutput(files) {
	return {
		generator: 'ng-boba',
		files: files
	};
}

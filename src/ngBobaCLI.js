var rawArgs = process.argv.slice(2);
var argv = require('minimist')(rawArgs);
var fs = require('fs');
var ngBoba = require('./ngBoba');

if (argv.config || rawArgs.length == 0) {

	// stores all the configuration for ng-boba
	var configFile = argv.config ? argv.config : 'ng-boba.json';
	fs.readFile(configFile, 'utf8', function (err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}
		var config = JSON.parse(data);
		applyArguments(config);
	});
} else {
	applyArguments();
}

function applyArguments(config) {
	config = config || {};

	// aggregation
	if (argv.files) {
		config.files = argv.files.split(',');
	}
	if (argv.folder) {
		config.folder = argv.folder;
	}

	// bundling
	if (argv.modules) {
		config.modules = argv.modules;
	}
	if (argv.ignoreModules) {
		config.ignoreModules = argv.ignoreModules.split(',')
	}

	// generates a json file
	if (argv.output) {
		config.output = argv.output;
	}

	if (argv.verbose) {
		config.verbose = argv.verbose;
	}
	ngBoba(config).done();
}

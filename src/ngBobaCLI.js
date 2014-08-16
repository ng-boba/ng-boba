var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var ngBoba = require('./ngBoba');

if (argv.config) {

	// stores all the configuration for ng-boba
	var config = (argv.config === true) ? 'ng-boba.json' : argv.config;
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}
		config = JSON.parse(data);
		ngBoba(config).done();
	});
} else {

	// build up the configuration via options
	var config = {};

	config.modules = argv.modules;
	config.output = argv.output;
	config.files = argv.files;
	config.folder = argv.folder;
//	config.debug = argv.debug;

	ngBoba(config).done();
}




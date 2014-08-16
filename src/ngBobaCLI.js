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
	var config = {

		// TODO: convert to array
		modules: argv.modules,
		output: argv.output,

		// TODO: convert to array
		files: argv.files,
		folder: argv.folder,
		verbose: argv.verbose,

		// TODO: convert to array
		ignoreModules: (argv.ignoreModules || '').split(',')
	};
	ngBoba(config).done();
}




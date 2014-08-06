var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var ngBoba = require('./ng-boba-main');

var file = argv.config ? argv.config : 'boba-config.json';

// stores all the configuration for ng-boba
var config;
fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }
    config = JSON.parse(data);
    ngBoba(config).then(function(files) {
        console.log(files);
    }).done();
});

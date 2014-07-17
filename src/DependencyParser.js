
var fs = require('fs');
var angular = require('angular');
var inject = angular.injector(['ng']).invoke;
var NGObjectDetails = require('./NGObjectDetails');

// is there a better way to get $q?
var $q;
inject(function (_$q_) {
	$q = _$q_;
});

var dependencyParser = {

	/**
	 * Extracts information about the angular objects within a file.
	 * @param path
	 * @returns {NGObjectDetails[]}
	 */
	parseFile: function(path) {
		var deferred = $q.defer();

		fs.readFile(path, 'utf8', function (err, data) {
			if (err) {
				return console.log(err);
			}

			// now that we have the codes
			var details = dependencyParser.parseCode(data);
			deferred.resolve(details);
		});

		return deferred.promise;
	},

	/**
	 *
	 * @param {String} code
	 * @returns {NGObjectDetails[]}
	 */
	parseCode: function(code) {
		var myRe = new RegExp(
			/module\(['|"]([^)]+)['|"]\)\.(factory|service|controller)\(['|"]([^'"]+)['|"],\s*function\(([^)]*)\)/g
		);
		var matches;
		var parsedObjects = [];
		while ((matches = myRe.exec(code)) !== null)
		{
			// console.log(matches);
			var deps = matches[4].split(', ');
			var o = new NGObjectDetails(
				matches[1],
				matches[2],
				matches[3],
				deps
			);
			console.log(o)
			parsedObjects.push(o);
		}
		return parsedObjects;
	}
};

module.exports = dependencyParser;

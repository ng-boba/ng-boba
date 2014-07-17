
var fs = require('fs');
var angular = require('angular');
var inject = angular.injector(['ng']).invoke;

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
		var myRe = new RegExp(/module\(['|"]([^)]+)['|"]\)/g);
		var str = code;
		var myArray;
		var matches = [];
		while ((myArray = myRe.exec(str)) !== null)
		{
			var NGObjectDetails = {};
			NGObjectDetails.module = myArray[1]
			matches.push(NGObjectDetails)
		}

		console.log(matches)
		return matches
	}
};

module.exports = dependencyParser;

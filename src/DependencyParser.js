
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

		// TODO: perform some horrible regexes to pull out the dependency details
		var details = [];
		details.push({
			hi: 'there'
		});
		return details;
	}
};

module.exports = dependencyParser;


var fs = require('fs');
var $q = require('q');
var NGObjectDetails = require('./NGObjectDetails');

/**
 * @private
 * @param s
 * @returns {Array}
 */
function parseStringDependencies(s) {

	// now let's parse the module dependency strings
	var depRegex = /['|"]([^'"]+)['|"]/g;
	var matches;
	var parsed = [];
	while ((matches = depRegex.exec(s)) !== null)
	{
		parsed.push(matches[1]);
	}
	return parsed;
}

/**
 * @private
 * @param code
 * @returns {Array}
 */
function parseModuleCode(code) {
	var regEx = new RegExp('module\\([\'|"]([^)\'"]+)[\'|"],', 'g');

	var parseModule = 'module\\([\'|"]([^)\'"]+)[\'|"],\\s*';
	var parseDependencies = '\\[([^)]*)\\]';
	var objectsRegex = new RegExp(
		 parseModule + parseDependencies, 'g'
	);

	var parsedObjects = [];
	var matches;
	while ((matches = objectsRegex.exec(code)) !== null)
	{
		var o = new NGObjectDetails(
			null, // modules are null
			'module',
			matches[1],
			parseStringDependencies(matches[2])
		);
		parsedObjects.push(o);
	}
	return parsedObjects;
};

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
				deferred.reject();
				return;
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
		var parseModule = 'module\\([\'|"]([^)]+)[\'|"]\\)',
			parseType = '\\.(decorator|constant|value|filter|directive|provider|service|factory|controller|animation|config|run)\\(',
			parseName = '[\'|"]([^\'"]+)[\'|"]',
			parseDependencies = ',\\s*function\\(([^)]*)\\)';
		var objectsRegex = new RegExp(
			parseModule + parseType + parseName + parseDependencies, 'g'
		);
		var splitDepRegEx = new RegExp(/\s*,\s*/);
		var matches;
		var parsedObjects = parseModuleCode(code);
		while ((matches = objectsRegex.exec(code)) !== null)
		{
			var deps = [];
			if (matches[4]) {
				deps = matches[4].split(splitDepRegEx);
			}
			var o = new NGObjectDetails(
				matches[1],
				matches[2],
				matches[3],
				deps
			);
			parsedObjects.push(o);
		}
		return parsedObjects;
	}
};

module.exports = dependencyParser;

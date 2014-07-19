
var fs = require('fs');
var $q = require('q');
var NGObjectDetails = require('./NGObjectDetails');

/**
 * @private
 * @param s
 * @param {Boolean} asString - if the dependencies are specified in strings...
 * @returns {Array}
 */
function parseDependencies(s, asString) {
	if (!s) {
		return [];
	}

	// now let's parse the module dependencies
	var depRegex;
	if (asString) {
		depRegex = /\s*['|"]([^'"]+)['|"]\s*/g;
	} else {
		depRegex = /\s*([^,]+)\s*/g;
	}
	var matches;
	var parsed = [];
	while ((matches = depRegex.exec(s)) !== null) {
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

	var parseModuleRegex = 'module\\([\'|"]([^)\'"]+)[\'|"],\\s*';
	var parseDependenciesRegex = '\\[([^)]*)\\]';
	var objectsRegex = new RegExp(
		 parseModuleRegex + parseDependenciesRegex, 'g'
	);

	var parsedObjects = [];
	var matches;
	while ((matches = objectsRegex.exec(code)) !== null) {
		var o = new NGObjectDetails(
			null, // modules are null
			'module',
			matches[1],
			parseDependencies(matches[2], true)
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
		var parseModuleRegex = 'module\\([\'|"]([^)]+)[\'|"]\\)',
			parseTypeRegex = '\\.(decorator|constant|value|filter|directive|provider|service|factory|controller|animation|config|run)\\(',
			parseNameRegex = '[\'|"]([^\'"]+)[\'|"]',
			parseDependenciesRegex = ',\\s*function\\(([^)]*)\\)';
		var objectsRegex = new RegExp(
			parseModuleRegex + parseTypeRegex + parseNameRegex + parseDependenciesRegex, 'g'
		);
		var matches;
		var parsedObjects = parseModuleCode(code);
		while ((matches = objectsRegex.exec(code)) !== null) {
			var o = new NGObjectDetails(
				matches[1],
				matches[2],
				matches[3],
				parseDependencies(matches[4])
			);
			parsedObjects.push(o);
		}
		return parsedObjects;
	}
};

module.exports = dependencyParser;

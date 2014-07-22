/**
 * Utility methods for parsing angular codes
 */
var fs = require('fs');
var $q = require('q');
var NGDependencyParser = require('./NGDependencyParser');

module.exports = {
	parseFile: parseFile,
	parseFolder: parseFolder
};

/**
 * Extracts information about the angular objects within a file.
 * @param {String} filePath
 * @returns {q.promise} fileObject
 */
function parseFile(filePath) {
	var deferred = $q.defer();
	var filePath = filePath;

	fs.readFile(filePath, 'utf8', function (err, data) {
		if (err) {
			// console.log(err);
			deferred.reject();
			return;
		}

		// now that we have the codes
		var ngObject = NGDependencyParser.parseCode(data);
		var fileObject = {
			filePath: filePath,
			results: ngObject
		}
		deferred.resolve(fileObject);
	});

	return deferred.promise;
}

/**
 * Parses all files in a directory and returns angular object information.
 * @param {String} directoryPath
 * @returns {q.promise} fileObjects[]
 */
function parseFolder(directoryPath) {
	var deferred = $q.defer();
	var directoryPath = directoryPath;
	var fileObjects = [];

	fs.readdir(directoryPath, function (err, files) {
		if (err) {
			return console.log(err);
		}
		var nodes = [];
		var qs = [];
		for (var i = 0; i < files.length; i++) {
			var fullFilePath = directoryPath + '/' + files[i];
			var result = parseFile(fullFilePath);
			result.then(function(fileObject) {
				fileObjects.push(fileObject);
			});
			qs.push(result);
		}
		$q.all(qs).then(function() {
			deferred.resolve(fileObjects);
		});

	});
	return deferred.promise;
}

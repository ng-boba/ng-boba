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
	isFile(filePath).then(function() {
		fs.readFile(filePath, 'utf8', function (err, data) {
			if (err) {
				deferred.reject(err);
				return;
			}

			// now that we have the codes
			var ngObject = NGDependencyParser.parseCode(data);
			var fileObject = {
				filePath: filePath,
				results: ngObject
			};
			deferred.resolve(fileObject);
		});
	}).catch(function() {
		deferred.reject();
	});
	return deferred.promise;
}

/**
 * Is it a file?
 * @param filePath
 * @returns {q.promise}
 */
function isFile(filePath) {
	var deferred = $q.defer();
	fs.stat(filePath, function(err, stat) {
		if (err || !stat) {
			deferred.reject();
			return;
		}
		if (stat.isDirectory()) {
			deferred.reject();
		} else {
			deferred.resolve();
		}
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
	var directoryPath = directoryPath.substr(-1) == '/' ? directoryPath : directoryPath + '/';
	var fileObjects = [];
	fs.readdir(directoryPath, function (err, files) {
		if (err) {
			deferred.reject(err);
			return;
		}
		var results = [];
		for (var i = 0, iM = files.length; i < iM; i++) {
			var filePath = directoryPath + files[i];
			var result = parseFile(filePath).then(function(fileObject) {
				if (fileObject) {
					fileObjects.push(fileObject);
				}
			});
			results.push(result);
		}
		$q.allSettled(results).finally(function() {
			deferred.resolve(fileObjects);
		});
	});
	return deferred.promise;
}

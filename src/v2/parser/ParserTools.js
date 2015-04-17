
var fs = require('fs');
var $q = require('q');

module.exports = {
  readFile: readFile,
  parseFolder: parseFolder
};

/**
 * Reads a file returns the contents
 * @param {String} filePath
 * @returns {q.promise} fileObject
 */
function readFile(filePath) {
  var deferred = $q.defer();
  var filePath = filePath;
  isFile(filePath).then(function () {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        deferred.reject(err);
        return;
      }
      deferred.resolve(data);
    });
  }).catch(function () {
    deferred.reject('No file found');
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
  fs.stat(filePath, function (err, stat) {
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
function parseFolder(directoryPath, parser) {
  var deferred = $q.defer();
  var directoryPath = directoryPath.substr(-1) == '/' ? directoryPath : directoryPath + '/';
  var parseResults = [];
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      deferred.reject(err);
      return;
    }
    var results = [];
    for (var i = 0, iM = files.length; i < iM; i++) {
      var filePath = directoryPath + files[i];
      var result = (function(filePath) {
        return readFile(filePath).then(function(contents) {
          if (parser) {
            parseResults.push({
              filePath: filePath,
              results: parser(contents, filePath)
            });
          } else {
            parseResults.push({
              filePath: filePath,
              contents: contents
            });
          }
        });
      })(filePath);
      results.push(result);
    }
    $q.allSettled(results).finally(function () {
      deferred.resolve(parseResults);
    });
  });
  return deferred.promise;
}

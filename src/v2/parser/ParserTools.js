
var fs = require('fs');
var $q = require('q');

module.exports = {
  parseFile: parseFile
};

/**
 * Reads a file and passes the contents into a file
 * @param {String} filePath
 * @returns {q.promise} fileObject
 */
function parseFile(filePath) {
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

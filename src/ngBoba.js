var NGBobaLogger = require('./util/NGBobaLogger');
var BobaParserTools = require('./parser/BobaParserTools');
var NGProject = require('./data/NGProject');
var $q = require('q');
var fs = require('fs');

module.exports = addBoba;

function addBoba(config) {

  if (!config) {
    throw 'Boba needs a config to run.';
  }

  if (!config.folder && !config.files) {
    throw 'Add files or folder option to your config';
  }

  if (config.folder && config.files) {
    console.warn('Looks like you specified both files and folder options. Folder takes priority.');
  }

  if (!config.modules || config.modules.length == 0) {
    throw 'Specify one or more angular modules.';
  }

  if (config.output) {

    // TODO: validate that the output file is empty
  }

  // TODO: allow user configured log level
  if (config.verbose) {
    NGBobaLogger.level = NGBobaLogger.LOG_LEVEL.VERBOSE;
  }

  var moduleFormat;
  switch (config.moduleFormat) {
    default:
    case '1':
    case 'anonymous':
      moduleFormat = 1;
      break;

    case '2':
    case 'array':
      moduleFormat = 2;
      break;
  }

  var deferred = $q.defer();
  if (config.folder) {
    BobaParserTools.parseFolder(config.folder, moduleFormat).then(function(results) {
      handleParsedFiles(config, results, deferred);
    }, function() {
      deferred.reject('Error while parsing folder config');
    }).done();
  } else {

    // use files
    BobaParserTools.parseFiles(config.files, moduleFormat).then(function(results) {
      handleParsedFiles(config, results, deferred);
    }, function(e) {

      // TODO: better way to emit errors
      console.warn(e);
      deferred.reject('Error while parsing file config');
    }).done();
  }
  return deferred.promise;

  /**
   * Assembles a NGProject from parsed details
   * @param config
   * @param {Array} parsedFiles
   * @param {q.promise} deferred
   */
  function handleParsedFiles(config, parsedFiles, deferred) {
    var project = new NGProject();
    parsedFiles.forEach(function (fileObject) {
      project.addFileComponents(fileObject.filePath, fileObject.results);
    });

    if (config.dependencies) {
      config.dependencies.forEach(function (dependency) {
        project.addBaseDependency(dependency);
      });
    }

    if (config.shims) {
      Object.keys(config.shims).forEach(function(filePath) {
        var shimComponents = config.shims[filePath];
        project.addFileShims(filePath, shimComponents);
      });
    }

    var files;
    try {
      files = project.getBundleFiles(config.modules[0], config.ignoreModules);
    } catch (e) {
      if (config.verbose) {
        console.log('Registered modules:', project.getModuleNames());
      }

      // rethrow
      deferred.reject(e);
      return;
    }

    var output = formatOutput(files);
    if (!config.output) {
      deferred.resolve(output);
    }

    // write the file list to file
    var s = config.verbose ? JSON.stringify(output, null, "\t") : JSON.stringify(output);
    fs.writeFile(config.output, s, function (err) {
      if (err) {
        NGBobaLogger.error('[NGBA:OUTP', 'Could not write output', [
          'The provided output path was invalid: ' + config.output
        ]);
        deferred.reject();
        return;
      }
      deferred.resolve(output);
    });
  }

  /**
   * Creates the output envelope for the file list
   * @param {Array} files
   * @returns {Object}
   */
  function formatOutput(files) {
    return {
      generator: 'ng-boba',
      files: files
    };
  }
}

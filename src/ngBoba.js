var BobaParserTools = require('./parser/BobaParserTools');
var NGProject = require('./data/NGProject');
var $q = require('q');

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
    BobaParserTools.parseFolder(config.folder, moduleFormat).then(function (result) {
      handleParsedFiles(config, result, deferred);
    });

  } else {

    // use files
    BobaParserTools.parseFiles(config.files, moduleFormat).then(function (result) {
      handleParsedFiles(config, result, deferred);
    });
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

    var files;
    try {
      files = project.getBundleFiles(config.modules[0], config.ignoreModules);
    } catch (e) {
      if (config.verbose) {
        console.log('Registered modules:', project.getModuleNames());
      }

      // rethrow
      throw e;
    }

    var output = formatOutput(files);
    if (config.output) {

      // write the file list to file
      var s = JSON.stringify(output);
      fs.writeFile(config.output, s, function (err) {
        if (err) {
          return;
        }
      });
    } else {
      console.log(output);
    }
    deferred.resolve(output);
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

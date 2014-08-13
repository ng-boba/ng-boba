var BobaParserTools = require('./parser/BobaParserTools');
var NGProject = require('./data/NGProject');
var $q = require('q');

module.exports = addBoba;

function addBoba(config) {

    if (!config) {
        throw ('Boba needs a config to run.');
    }

    if (!config.folder && !config.files) {
        throw ('Add files or folder option to your config');
    }

    if (config.folder && config.files) {
        throw ('Both files and folder options cannot be specified.  Choose one.');
    }

    if (!config.modules || config.modules.length == 0) {
        throw ('Specify one or more angular modules.');
    }

    if (config.output) {

        // TODO: validate that the output file is empty
    }
    if (!config.moduleFormat) {
        throw ('Specify how your angular modules are defined. Options: "anonymous" or "array"');
    }

    var deferred = $q.defer();
    if (config.folder) {
        BobaParserTools.parseFolder(config.folder, config.moduleFormat).then(function(result) {
            handleParsedFiles(config, result, deferred);
        });
        return deferred.promise;
    } else if (config.files) {
        BobaParserTools.parseFiles(config.files, config.moduleFormat).then(function(result){
            handleParsedFiles(config, result, deferred);
        });
        return deferred.promise;
    } else {
        throw "Nothing to do";
    }

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

        var files = project.getBundleFiles(config.modules[0]);
        var s = JSON.stringify(formatOutput(files));

        if (config.output) {

            // write the file list to file
            fs.writeFile(config.output, s, function (err) {
                if (err) {
                    return;
                }
            });
            return;
        }
        deferred.resolve(files);
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

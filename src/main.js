/**
 * ng-boba dev main
 */
var BobaParserTools = require('./BobaParserTools');
var NGProject = require('./data/NGProject');

console.log('\nng-boba\n');
var filePath = "test/project/";
var result = BobaParserTools.parseFolder(filePath);

result.then(function(parsedFiles) {

	// create a list of files
	var project = new NGProject();

	parsedFiles.forEach(function(fileObject) {
		project.addFileComponents(fileObject.filePath, fileObject.results);
	});

	console.log('');
	console.log('Generated project graph');
	project.addBaseDependency('src/jquery/jquery.js');
	project.addBaseDependency('src/jquery/jquery2.js');
	console.log(project.getBundleFiles('jModule'));

}).done(function(err) {
	if (err) {
		console.log(arguments);
	}
});

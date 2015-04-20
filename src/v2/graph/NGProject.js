
var GraphNode = require('./GraphNode');

function NGProject() {

}

NGProject.create = function(results) {
  console.log('create project', results);
  var p = new NGProject();

  // TODO: add module dependencies
  return p;
};

module.exports = NGProject;


var ParserTools = require('../../src/v2/parser/ParserTools');

module.exports = {
  readTestCase: readTestCase
};

var TEST_DIR = 'test/cases/';
function readTestCase(name) {
  return ParserTools.parseFile(TEST_DIR + name + '.js');
}

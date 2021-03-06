/**
 * Handles the duties of parsing JavaScript code
 *
 * @note This implementation uses regular expression.
 */
var NGModule = require('./../data/NGModule');
var NGComponent = require('./../data/NGComponent');
var NGModuleFormat = require('./../data/NGModuleFormat');

module.exports = {
  parseCode: parseCode
};

/**
 * Main entry for parsing JavaScript codes
 * @param {String} code
 * @param {Enum} moduleFormat (optional) - Defaults to anonymous format parsing
 * @returns {NGObjectDetails[]}
 */
function parseCode(code, moduleFormat) {
  var parseModuleRegex = '\\s*module\\([\'|"]([^)]+)[\'|"]\\)',
    parseTypeRegex = '\\s*\\.(decorator|constant|value|filter|directive|provider|service|factory|controller|animation|config|run)\\(',
    parseNameRegex = '\\s*[\'|"]([^\'"]+)[\'|"]',
    parseDependenciesRegexArrayNotation = ',\\s*\\[([^\\[]*)\\s*,\\s*function',
    parseDependenciesRegex = ',\\s*function\\s*\\(([^)]*)\\)';

  var objectsRegex;
  switch (moduleFormat) {
    default:
    case NGModuleFormat.ANONYMOUS:
      objectsRegex = new RegExp(
          parseModuleRegex + parseTypeRegex + parseNameRegex + parseDependenciesRegex, 'g'
      );
      break;
    case NGModuleFormat.ARRAY:
      objectsRegex = new RegExp(
          parseModuleRegex + parseTypeRegex + parseNameRegex + parseDependenciesRegexArrayNotation, 'g'
      );
      break;
  }

  // apply the regex
  var matches;
  var parsedObjects = parseModuleCode(code);
  while ((matches = objectsRegex.exec(code)) !== null) {
    var o = new NGComponent(
      matches[1],
      matches[2],
      matches[3],
      parseDependencies(matches[4], moduleFormat == NGModuleFormat.ARRAY)
    );
    parsedObjects.push(o);
  }
  return parsedObjects;
}

/**
 * @private
 * @param s
 * @param {Boolean} asString - if the dependencies are specified in strings...
 * @returns {Array}
 */
function parseDependencies(s, asString) {
  if (!s) {
    return [];
  }

  // now let's parse the module dependencies
  var depRegex;
  if (asString) {
    depRegex = /\s*['|"]([^'"]+)['|"]\s*/g;
  } else {
    depRegex = /\s*([^,\s]+)\s*/g;
  }
  var matches;
  var parsed = [];
  while ((matches = depRegex.exec(s)) !== null) {
    parsed.push(matches[1]);
  }
  return parsed;
}

/**
 * @private
 * @param code
 * @returns {Array}
 */
function parseModuleCode(code) {
  var parseModuleRegex = 'module\\([\'|"]([^)\'"]+)[\'|"],\\s*';
  var parseDependenciesRegex = '\\[([^)]*)\\]';
  var objectsRegex = new RegExp(
      parseModuleRegex + parseDependenciesRegex, 'g'
  );

  var parsedObjects = [];
  var matches;
  while ((matches = objectsRegex.exec(code)) !== null) {
    var o = new NGModule(
      matches[1],
      parseDependencies(matches[2], true)
    );
    parsedObjects.push(o);
  }
  return parsedObjects;
}


/**
 * Basic logging API to provide more useful errors when debugging a project
 * @type {number}
 */
var LOG_SILENT = 0;
var LOG_NORMAL = 1;
var LOG_VERBOSE = 2;

var logger = {
  LOG_LEVEL: {
    SILENT: LOG_SILENT,
    NORMAL: LOG_NORMAL,
    VERBOSE: LOG_VERBOSE
  },

  level: LOG_SILENT,

  log: function() {
    switch (logger.level) {
      default:
      case LOG_SILENT:
        break;
      case LOG_NORMAL:
      case LOG_VERBOSE:
    }
  },

  error: function(code, short, verbose) {
    if (logger.level === LOG_SILENT) {
      return;
    }
    console.error('[' + code + ']', short);
    if (logger.level === LOG_VERBOSE) {
      if (!verbose) {
        verbose = [
          'Please open an issue for more assistance:',
          'https://github.com/ng-boba/ng-boba/issues?q=' + encodeURIComponent(code)
        ];
      }
      console.error("*\n" + ' * ' + verbose.join("\n * ") + "\n*");
    }
  },

  throw: function(code, exception, short, verbose) {
    logger.error(code, short, verbose);
    throw '[' + code + '] ' + exception;
  }
};

module.exports = logger;

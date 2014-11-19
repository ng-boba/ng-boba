/**
 * ng-boba-infuser
 *
 * Simple script loader to get boba into your pipeline.
 *
 * Make sure you include angular as a dependency in your
 * ngBoba configuration otherwise you'll get angular
 * module init errors.
 */
(function() {

  // simple xhr util
  function loadConfig(url, callback) {
    var jsonfile = new XMLHttpRequest();
    jsonfile.open("GET", url, true);
    jsonfile.onreadystatechange = function () {
      if (jsonfile.readyState == 4 && jsonfile.status == 200) {
        try {
          var response = JSON.parse(jsonfile.responseText);
          callback(response);
        } catch (e) {
          console.log('Invalid infuser config file');
        }
      }
    };
    jsonfile.send(null);
  }

  function loadScriptInline(url) {
    var xhrObj = new XMLHttpRequest();
    xhrObj.open('GET', url, false);
    xhrObj.send('');
    if (xhrObj.status == 200 && xhrObj.responseText) {
      var se = document.createElement('script');
      se.type = "text/javascript";
      se.text = xhrObj.responseText;
      document.getElementsByTagName('head')[0].appendChild(se);
    } else {
      throw 'Failed to load script: ' + url;
    }
  }

  function loadScripts(scripts, index) {
    index = index || 0;
    if (index >= scripts.length) {
      return;
    }
    loadScript(scripts[index]).then(function() {
      loadScripts(scripts, index+1);
    });
  }

  function loadScript(url) {
    var p = new Promise(function(resolve, reject) {
      var el = document.createElement('script');
      el.src = url;
      el.onload = function() {
        resolve();
      };
      document.getElementsByTagName('html')[0].appendChild(el);
    });
    return p;
  }

  // infuser main
  var scripts = document.getElementsByTagName('script');
  scripts = Array.prototype.slice.call(scripts, 0);
  scripts.forEach(function (el) {

    // TODO: better way to trigger built files
    var useBuilt = window.location.hash == '#built';
    if (useBuilt) {
      var url = el.getAttribute('data-ng-boba-built');
      if (url) {
        loadScript(url);
      }
      return;
    }
    var url = el.getAttribute('data-ng-boba');
    if (url) {
      loadConfig(url, function (config) {
        loadScripts(config.files);
      });
    }
  });
})();

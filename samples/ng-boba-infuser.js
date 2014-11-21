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

  // query param util
  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  // we need to deactivate the angular app if it exists
  // and manually bootstrap angular
  var appEl;
  var appName;
  function loadScripts(scripts, index) {
    index = index || 0;
    if (index == 0) {
      appEl = document.querySelector('[ng-app]');
      if (appEl) {
        appName = appEl.getAttribute('ng-app');
        appEl.removeAttribute('ng-app');
      }
    }
    if (index >= scripts.length) {
      if (appEl) {
        appEl.setAttribute('ng-app', appName);
        appEl.setAttribute('ng-strict-di', true);

        // bootstrap the app
        window.angular.bootstrap(appEl, [appName]);
      }
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
    var bobaBuilt = getParameterByName('bobaBuilt') === 'true';
    if (bobaBuilt) {
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

/**
 * ng-boba-infuser
 *
 * Simple script loader to get boba into your pipeline.
 * Make sure you include angular before the infuser as it depends on
 * some functionality from angular.
 */

// simple xhr util
function loadConfig(url, callback) {
  var jsonfile = new XMLHttpRequest();
  jsonfile.open("GET", url, true);
  jsonfile.onreadystatechange = function () {
    if (jsonfile.readyState == 4 && jsonfile.status == 200) {
      var response = JSON.parse(jsonfile.responseText);
      callback(response);
    }
  };
  jsonfile.send(null);
}

function loadScript(url) {
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

var scripts = document.getElementsByTagName('script');
scripts = Array.prototype.slice.call(scripts, 0);
scripts.forEach(function (el) {
  var url = el.getAttribute('data-boba-config');
  if (url) {
    loadConfig(url, function (config) {
      config.files.forEach(function (file) {
        loadScript(file);
      });
    });
  }
});

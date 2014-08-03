/**
 * ng-boba-infuser
 * Simple script loader to get boba into your pipeline.
 * Make sure you include angular before the infuser as it depends on
 * some functionality from angular.
 */

// simple xhr util
// @see http://stackoverflow.com/questions/7542542/xmlhttprequest-for-json-file-works-perfectly-in-chrome-but-not-in-firefox
function loadConfig(url, callback) {
	var jsonfile = new XMLHttpRequest();
	jsonfile.open("GET", url, true);
	jsonfile.onreadystatechange = function() {
		if (jsonfile.readyState == 4 && jsonfile.status == 200) {
			var response = JSON.parse(jsonfile.responseText);
			callback(response);
		}
	};
	jsonfile.send(null);
}

function appendScript(url) {
	var el = document.createElement('script');
	el.src = url;
	document.body.appendChild(el);
}

var scripts = document.getElementsByTagName('script');
scripts = Array.prototype.slice.call(scripts, 0);
scripts.forEach(function(el) {
	var c = el.getAttribute('data-boba-config');
	if (c) {
		console.log('Found boba config!', c);
		loadConfig(c, function(config) {
			config.files.forEach(function(file) {
				appendScript(file);
			});
		});
	}
});

//	<html>
//	<head>
//		<script src="angular.js" />
//		<script src="infuser.js" data-boba-files="bobaOutput.json" />
//	</head>
//	<body>


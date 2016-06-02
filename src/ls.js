// ls.js

// Usage: drive-sync ls
// List out all files in current scope.

var deasync = require('deasync');
var google = require('googleapis');
var tablify = require(appRoot+'/util/tablify.js');
var authtoken = require(appRoot+'/src/auth.js');
var auth = authtoken();

module.exports = function (pwd) {
	var sync = true;
	var service = google.drive('v3');
	service.files.list({
		q: "'"+pwd+"' in parents",
		auth: auth,
		fields: "files(name, mimeType, id)",
		orderBy: 'folder'
	}, function(err, response) {
		if (err) {
			console.log('The API returned an error: ' + err);
      return;
		}

		var files = response.files;
		if (files.length == 0) {
      		console.log('Empty directory.');
    	} else {
      		tablify('ls', files);
    	}
    	sync = false;
	});

	while(sync) {deasync.sleep(100);}
}

// cd.js

// Usage: drive-sync cd <folder>
// Change the current folder to <folder>.

var deasync = require('deasync');
var fs = require('fs');
var google = require('googleapis');
var authtoken = require(appRoot+'/src/auth.js');
var auth = authtoken();

module.exports = function(dir, pwd) {
	if (dir == '..') {
		goUp(pwd);
		return;
	}
	if (!dir) {
		setPwd('root');
		return;
	}
	var found = findFolder(dir,pwd);

	if (!found) {
		console.log('No such folder as %s in %s.', dir, pwd);
		return;
	}

	setPwd(found);
}

function findFolder(dir, pwd) {
	var sync = true;
	var found = false;
	var service = google.drive('v3');
	service.files.list({
		q: "'"+pwd+"' in parents",
		auth: auth,
		fields: "files(name, mimeType, id)",
	}, function(err, response) {
		if (err) {
			console.log('The API returned an error: ' + err);
      		return;
		}

		var files = response.files;
		if (files.length == 0) {
      		console.log('Empty directory.');
      		return false;
    	} else {
      		for (var i = 0; i < files.length; i++) {
        		var file = files[i];
        		if (dir == file.name) {
        			found = file.id;
        		}
      		}
    	}
    	sync = false;
	});

	while(sync) {deasync.sleep(100);}

	return found;
}

function setPwd(folderId) {
	var content = "{ \"pwd\": \""+folderId+"\"}";
	try {
		fs.writeFileSync(appRoot+'/config.json', content);
	} catch(e) {
		console.log(e);
		return;
	}
	console.log("Directory changed");
}

function goUp(pwd) {
	var sync = true;
	var service = google.drive('v2');
	service.parents.list({
		auth: auth,
		fileId: pwd,
		fields: "items(id, isRoot)"
	}, function(err, response) {
		if (err) {
			console.log('The API returned an error: ' + err);
      		return;
		}

		var items = response.items;

		if (items.length == 0) {
      		console.log('Parent not found.');
      		return false;
    	} else {
      		setPwd(items[0].id);
    	}
    	sync = false;
	});

	while(sync) {deasync.sleep(100);}

}

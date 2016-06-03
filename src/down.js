// down.js

// Usage: drive-sync down <file>
// Download file whose name is given in the argument to
// current folder.

var deasync = require('deasync');
var fs = require('fs');
var google = require('googleapis');
var ProgressBar = require('progress');

var authtoken = require(appRoot+'/src/auth.js');
var mimetypes = require(appRoot+'/util/mimetypes.js');
var auth = authtoken();

module.exports = function(filename, pwd) {
  if (filename == 'all') {
    downloadAll(pwd);
    return;
  }

  var found = findFile(filename, pwd);

  if (!found) {
    console.log('No such file as %s in directory.', filename, pwd);
    return;
  }

  download(found, filename);
}


function findFile(filename, pwd) {
	var sync = true;
	var found = false;
	var service = google.drive('v3');
	service.files.list({
		q: "'"+pwd+"' in parents",
		auth: auth,
		fields: "files(name, id)",
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
        		if (filename == file.name) {
        			found = file.id;
        		}
      		}
    	}
    	sync = false;
	});

	while(sync) {deasync.sleep(100);}

	return found;
}

function download(fileId, filename) {
  var sync = true;
  var dest = fs.createWriteStream('./'+filename);
  var bar;

  console.log('Download of %s initiated.', filename);

	var service = google.drive('v3');
	service.files.get({
    fileId: fileId,
		alt: "media",
		auth: auth
	})
  .on('response', function(res) {
    var len = parseInt(res.headers['content-length'], 10);
    bar = new ProgressBar('  downloading [:bar] :percent :etas', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: len
    });
  })
  .on('data', function(chunk) {
    bar.tick(chunk.length);
  })
  .on('end', function() {
    console.log('%s downloaded.', filename);
    sync = false;
  })
  .on('error', function() {
    console.log('Error during download: ', err);
    sync = false;
  })
  .pipe(dest);

	while(sync) {deasync.sleep(100);}
}

function downloadAll(pwd) {
  var sync = true;
  var filelist;
	var service = google.drive('v3');
	service.files.list({
		q: "'"+pwd+"' in parents",
		auth: auth,
		fields: "files(name, id, mimeType)",
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
      		filelist = files;
          sync = false;
    	}
	});

  while(sync) {deasync.sleep(100)};

  for (var i = 0; i < filelist.length; i++) {
    var file = filelist[i];
    if (!mimetypes.isFolder(file.mimeType) && !mimetypes.isDoc(file.mimeType)) {
      download(file.id, file.name);
    }
    // if (!mimetypes.isFolder(file.mimeType) && mimetypes.isDoc(file.mimeType)) {
    //   exportDoc(file, null);
    // }
  }
}

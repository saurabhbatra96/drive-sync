//	drive-sync
//  Copyright (C) 2016  Saurabh Batra
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.

// export.js

// Usage: drive-sync export <file> <format>
// Export and download Google Doc named <file> from the
// current folder in the <format> format.

var deasync = require('deasync');
var fs = require('fs');
var google = require('googleapis');
var proxy = fs.readFileSync(appRoot+'/proxy.txt')
if (proxy != "") {
  google.options({ proxy: proxy });
}
var ProgressBar = require('progress');

var authtoken = require(appRoot+'/src/auth.js');
var mimetypes = require(appRoot+'/util/mimetypes.js');
var auth = authtoken();

module.exports = function(filename, mime) {
  var found = findFile(filename, pwd);
  if (!found) {
    console.log('No such file as %s in directory.', filename, pwd);
    return;
  }

  if (mimetypes.isDoc(found.mimeType)) {
    if (mime && mimetypes.isSupportedMime(mime)) {
      var convmime = mimetypes.convertMime(mime);
      exp(found.id, filename, convmime, mime);
      return;
    } else if (mime && !mimetypes.isSupportedMime(mime)) {
      console.log("Incorrect export file format requested. Please check the official guidelines on exporting.");
      return;
    }
    exp(found.id, filename, mimetypes.getDefault(found.mimeType), mimetypes.convertMime(mimetypes.getDefault(found.mimeType)));
    return;
  }

  console.log("File is not a Google Doc. Aborting.");
}

function exp(fileId, filename, mime, ext) {
  var sync = true;
  var dest = fs.createWriteStream('./'+filename+'.'+ext);
  var bar;

  console.log('Download of %s initiated.', filename);

  var service = google.drive('v3');
  service.files.export({
    fileId: fileId,
    mimeType: mime,
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


function findFile(filename, pwd) {
	var sync = true;
	var found = false;
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
      		for (var i = 0; i < files.length; i++) {
        		var file = files[i];
        		if (filename == file.name) {
        			found = file;
        		}
      		}
    	}
    	sync = false;
	});

	while(sync) {deasync.sleep(100);}

	return found;
}

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

// ls.js

// Usage: drive-sync ls
// List out all files in current scope.

var deasync = require('deasync');
var google = require('googleapis');
var fs = require('fs');
var proxy = fs.readFileSync(appRoot+'/proxy.txt')
if (proxy != "") {
  google.options({ proxy: proxy });
}
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

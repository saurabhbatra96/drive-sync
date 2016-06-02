// pwd.js

// Usage: drive-sync pwd
// Print out name of current working directory.

var deasync = require('deasync');
var google = require('googleapis');
var authtoken = require(appRoot+'/src/auth.js');
var auth = authtoken();

module.exports = function (pwd) {
  var sync = true;
  var service = google.drive('v3');
  service.files.get({
    fileId: pwd,
    auth: auth,
    fields: "name,modifiedTime"
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }

    console.log('Name\tLast Modified');
    console.log('%s\t%s', response.name, response.modifiedTime);
    sync = false;
  });

  while(sync) {deasync.sleep(100);}
}

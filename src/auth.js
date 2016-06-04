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

// auth.js

// Code for authenticating the user.

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
// TODO: Deperacate in favor of a deasync implementation.
var readlineSync = require('readline-sync');
var deasync = require('deasync');

var SCOPES = ['https://www.googleapis.com/auth/drive'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-sync-auth.json';

module.exports = function() {
  try {
    var clientsecret = fs.readFileSync(appRoot+'/client_secret.json');
  } catch(e) {
    if(e.code == 'ENOENT') {
      console.log("Client Secret file missing.");
      return;
    }
  }

  return authorize(JSON.parse(clientsecret));
}

function authorize(credentials) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  try {
    var token = fs.readFileSync(TOKEN_PATH);
  } catch(e) {
    if (e.errno == 34)
      return getNewToken(oauth2Client);
    console.log(e);
    return;
  }
  oauth2Client.credentials = JSON.parse(token);
  return oauth2Client;
}

function getNewToken(oauth2Client) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize drive-sync by visiting this url: ', authUrl);

  var code = readlineSync.question('Enter the code given on that page here: ');

  var authtoken = {};
  var sync = true;

  oauth2Client.getToken(code, function(err, token) {
    if (err) {
      console.log('Error while trying to retrieve access token', err);
      return;
    }
    oauth2Client.credentials = token;
    storeToken(token);
    sync = false;
    authtoken = oauth2Client;
  });

  while(sync) {deasync.sleep(100);}
  return authtoken;
}

function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
}

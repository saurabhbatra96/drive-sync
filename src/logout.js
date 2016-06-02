// logout.js

var fs = require('fs');

module.exports = function() {
  var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
      process.env.USERPROFILE) + '/.credentials/';
  var TOKEN_PATH = TOKEN_DIR + 'drive-sync-auth.json';

  try {
    var token = fs.readFileSync(TOKEN_PATH);
  } catch(e) {
    console.log('Already logged out.');
    return;
  }

  fs.unlinkSync(TOKEN_PATH);
  console.log('Bye bye!');
}

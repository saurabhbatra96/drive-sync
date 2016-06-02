// This is our main resolver. It maps the commands and
// corresponding arguments to their respective functions.

// Requirements of various CLI utilities.
var listFiles = require(appRoot+'/src/ls.js');
var changeDir = require(appRoot+'/src/cd.js');
var currDir = require(appRoot+'/src/pwd.js');
var logout = require(appRoot+'/src/logout.js');

module.exports = function(cmd, value) {
	switch(cmd) {
		case 'ls':
			listFiles(pwd);
			break;
		case 'cd':
			changeDir(value, pwd);
			break;
		case 'pwd':
			currDir(pwd);
			break;
		case 'logout':
			logout();
			break;
	}
}

// This is our main resolver. It maps the commands and
// corresponding arguments to their respective functions.

// Requirements of various CLI utilities.
var listFiles = require(appRoot+'/src/ls.js');
var changeDir = require(appRoot+'/src/cd.js');
var currDir = require(appRoot+'/src/pwd.js');
var logout = require(appRoot+'/src/logout.js');
var download = require(appRoot+'/src/down.js');
var exportDoc = require(appRoot+'/src/export.js');

module.exports = function(cmd, value, opt) {
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
		case 'down':
			download(value, pwd);
			break;
		case 'export':
			exportDoc(value, opt);
			break;
	}
}

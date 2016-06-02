// This is our main resolver. It maps the commands and
// corresponding arguments to their respective functions.

// Requirements of various CLI utilities.

var listFiles = require(appRoot+'/src/ls.js');
var changeDir = require(appRoot+'/src/cd.js');

module.exports = function(cmd, value) {
	switch(cmd) {
		case 'ls':
			listFiles(pwd);
			break;
		case 'cd':
			changeDir(value, pwd);
			break;
	}
}
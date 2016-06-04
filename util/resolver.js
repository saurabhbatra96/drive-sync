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

// resolver.js

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

#!/usr/bin/env node

//  drive-sync
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

// This is the flagship CLI wrapper on top of the scripts.

// Resolve paths to absolutes.
var path = require('path');
global.appRoot = path.resolve(__dirname);

var program = require('commander');
var fs = require('fs');

// Current directory (pwd) state control.
try {
	var pwdjson = fs.readFileSync(appRoot+'/config.json');
} catch(e) {
	var defaultPwd = "{ \"pwd\": \"root\"}";
	fs.writeFileSync(appRoot+'/config.json', defaultPwd);
	var pwdjson = defaultPwd;
}
var pwdcontents = JSON.parse(pwdjson);
global.pwd = pwdcontents.pwd;

// Our command resolver.
var resolver = require(appRoot+'/util/resolver.js');

// Send the command to our resolver.
program
	.version('0.0.1')
	.arguments('<cmd> [value] [opt]')
	.action(function(cmd, value, opt) {
		resolver(cmd, value, opt);
	});

program.parse(process.argv);

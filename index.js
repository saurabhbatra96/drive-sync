#!/usr/bin/env node
// This will be the flagship CLI wrapper on top of the scripts.

// Resolve paths to absolutes.
var path = require('path');
global.appRoot = path.resolve(__dirname);

var program = require('commander');
var fs = require('fs');

// Current directory state control.
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
	.arguments('<cmd> [value]')
	.action(function(cmd, value) {
		resolver(cmd, value);
	});

program.parse(process.argv);

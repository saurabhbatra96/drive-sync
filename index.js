#!/usr/bin/env node
// This will be the flagship CLI wrapper on top of the scripts.

// Resolve paths to absolutes.
var path = require('path');
global.appRoot = path.resolve(__dirname);

var program = require('commander');

// Requirements of various CLI utilities.
var listFiles = require(appRoot+'/src/ls.js');

// Various default state controls.
var pwd = 'root';

program
	.version('0.0.1')
	.command('ls')
	.description('List files in current folder.')
	.action(listFiles(pwd));

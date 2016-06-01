#!/usr/bin/env node
// This will be the flagship CLI wrapper on top of the scripts.

var program = require('commander');

// Requirements of various CLI utilities.
var listFiles = require('./src/ls.js');

// Various default state controls.
var pwd = 'root';

program
	.version('0.0.1')
	.command('ls')
	.description('List files in current folder.')
	.action(listFiles(pwd));
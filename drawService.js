#!/usr/bin/env node

/**
 * Module dependencies.
 */

var commander = require('commander'),
	ansi 	  = require('ansi'), 
	cursor    = ansi(process.stdout),
	axel      = require('axel');

/**
 * initialize the variables to use
 */

module.exports = {
	ansi: ansi,
	commander: commander,
	cursor: cursor,
	axel: axel
}

#!/usr/bin/env node

/**
 * Module dependencies.
 */

var drawService  = require('./drawService'),
	  ctx     	   = drawService.axel,
    fs           = drawService.fs;

/**
 * This function remove the currently canvas
 */
function removeCanvas (){

  /** Clear the console */
  console.log('\033[2J');
  fs.unlink('./data/localStorage.json', function (err) {
	  if (err) throw err;
	});

}

/** start the function */
removeCanvas();
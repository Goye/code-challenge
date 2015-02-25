#!/usr/bin/env node

/**
 * Module dependencies.
 */

var drawService  = require('./drawService'),
	  ctx     	   = drawService.axel;

/**
 * This function remove the currently canvas
 */
function removeCanvas (){

  /** Clear the console */
  console.log('\033[2J');

}

/** start the function */
removeCanvas();
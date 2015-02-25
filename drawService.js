#!/usr/bin/env node

/**
 * Module dependencies.
 */

var commander    = require('commander'),
	ansi 	     = require('ansi'), 
	cursor       = ansi(process.stdout),
	axel         = require('axel'),
	fs			 = require('fs'),
	_ 			 = require('lodash');

/**
 * initialize the variables to use
 */

module.exports = {
	ansi: ansi,
	commander: commander,
	cursor: cursor,
	axel: axel,
	resetCursor: resetCursor,
	fs: fs,
	_: _,
	drawInConsole: drawInConsole,
	drawCanvas : drawCanvas,
	drawLine: drawLine,
	drawRectangle: drawRectangle
}

/**
 * This function reset the cursor pointer
 */
function resetCursor(){

	fs.readFile('./data/localStorage.json', function (err, data) {
	  if (err) throw err;
	  var data = data ? JSON.parse(data) : {};
	  
	  cursor.reset();
	  if(!_.isEmpty(data.canvas)){
	  	cursor.goto(0, data.canvas.height + 2);
	  }
	  
	});
	
}

/**
 * draw amazing things in the console
 * @param  {Object}  params
 * @return {Boolean} cb    
 */
function drawInConsole(params){

	var type = params.type ? params.type : 'canvas';
	delete params.type;
	switch(type) {
	    case 'canvas':
	        drawCanvas(params);
	        break;
	    case 'line':
	        drawLine(params);
	        break;
	    case 'rectangle':
	        drawRectangle(params);
	        break;    
	    default:
	        drawCanvas(params);
	}

}

/**
 * This function draw the canvas on the console
 * @param  {Object} params 
 */
function drawCanvas(params){

  var height = params.height || 0,
  	  width  = params.width  || 0;
  /** Clear the console */
  console.log('\033[2J');

  /** Draw the canvas */
  for (y=0; y< height; y+=1) {
    cursor.goto(width - 1, 0+y).write("|");
    cursor.goto(0, 0+y).write("|");
  }

  for (x=0; x< width; x+=1) {
    cursor.goto(0+x, height).write("-");
    cursor.goto(0+x, 0).write("-");
  }

}

/**
 * This function draw a line on the current canvas
 * @param  {Object} params 
 */
function drawLine(params){

	var x1 = params.x || 0,
		y1 = params.y || 0,
		x2 = params.X || 0,
		y2 = params.Y || 0;

	/** Drawing the line */
    axel.brush = "x";
    axel.line(x1, y1, x2, y2);

}

/**
 * This function draw a rectangle on the current canvas
 * @param  {Object} params
 */
function drawRectangle(params){

	var x1 = params.x1 || 0,
		y1 = params.y1 || 0,
		x2 = params.x2 || 0,
		y2 = params.y2 || 0;
	/** draw the box */
	ctx.brush = "x";
	ctx.box(x1, y1, x2, y2);

}

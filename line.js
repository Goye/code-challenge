#!/usr/bin/env node

/**
 * Module dependencies.
 */

var drawService  = require('./drawService'),
	  utilsService = require('./utilsService'),
	  ctx     	   = drawService.axel,
    cursor       = drawService.cursor;

module.exports = {
	drawLine : drawLine
}

var description = "draw line on the console";

/**
 * Get the params on the console
 */
utilsService.getParams(description, function (err, resp){

	var x1  = resp.firstLevelX || 0,
		  y1  = resp.firstLevelY || 0,
      x2  = resp.secondlevelX || 0,
      y2  = resp.secondlevelY || 0;

		drawLine(x1, y1, x2, y2, function (err, resp){
      if (err) return console.err(err);
      //console.log("drawn it", resp);
		});
});

/**
 * This function draw a line on the current canvas
 * @param  {Integer} x1 
 * @param  {Integer} y1 
 * @param  {Integer} x2 
 * @param  {Integer} y2 
 * @return {Boolean}   
 */
function drawLine(x1, y1, x2, y2, cb){

  /** drawing the line */
  ctx.brush = "x";
  ctx.line(x1, y1, x2, y2);

  /** put the cursor to the end */
  cursor.reset();
  cursor.goto(0, 12);
  cb(null, true);

}
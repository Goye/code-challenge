#!/usr/bin/env node

/**
 * Module dependencies.
 */

var drawService  = require('./drawService'),
	  utilsService = require('./utilsService'),
	  ctx     	   = drawService.axel;

module.exports = {
	drawRectangle : drawRectangle
}

var description = "draw rectangle on the console";

/**
 * Get the params on the console
 */
utilsService.getParams(description, function (err, resp){

	var x1  = resp.firstLevelX || 0,
		  y1  = resp.firstLevelY || 0,
      x2  = resp.secondlevelX || 0,
      y2  = resp.secondlevelY || 0;

		drawRectangle(x1, y1, x2, y2, function (err, resp){
      if (err) return console.err(err);
      console.log("drawn it", resp);
		});
});

/**
 * This function draw a rectangle on the current canvas
 * @param  {Integer} x1 
 * @param  {Integer} y1 
 * @param  {Integer} x2 
 * @param  {Integer} y2 
 * @return {Boolean}   
 */
function drawRectangle(x1, y1, x2, y2){

  /** draw the box */
  ctx.bg(255,255,0);
  ctx.box(x1, y1, x2, y2);
  /** put the cursor to the end */
  ctx.cursor.restore();

}
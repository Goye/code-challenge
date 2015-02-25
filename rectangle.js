#!/usr/bin/env node

/**
 * Module dependencies.
 */

var drawService  = require('./drawService'),
	  utilsService = require('./utilsService'),
	  ctx     	   = drawService.axel,
    cursor       = drawService.cursor;

module.exports = {
	startRectangle : startRectangle
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

		startRectangle(x1, y1, x2, y2, function (err, resp){
      if (err) throw err;
      //console.log("drawn it", resp);
		});
});

/**
 * This function make the logic to draw a rectangle
 * @param  {Integer} x1 
 * @param  {Integer} y1 
 * @param  {Integer} x2 
 * @param  {Integer} y2 
 * @return {Boolean}   
 */
function startRectangle(x1, y1, x2, y2, cb){

  /** put the cursor to the end */
  drawService.resetCursor();
  cb(null, true);

}
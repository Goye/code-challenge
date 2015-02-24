#!/usr/bin/env node

/**
 * Module dependencies.
 */

var drawService  = require('./drawService'),
	  utilsService = require('./utilsService'),
	  ctx     	   = drawService.axel;

module.exports = {
	drawCanvas : drawCanvas
}

var description = "draw canvas on the console";

/**
 * Get the params on the console
 */
utilsService.getParams(description, function (err, resp){

	var width  = resp.width || 0,
		height = resp.height || 0;

		drawCanvas(width, height, function (err, resp){
      if (err) return console.err(err);
      console.log("drawn it", resp);
		});
});


/**
 * This function draw the canvas on the console
 * @param  {Integer} width  
 * @param  {Integer} height 
 * @return {Boolean} cb    
 */
function drawCanvas(width, height, cb){

  ctx.clear();
  /** Blue box */
  ctx.bg(22, 31, 88);
  /** draw the box */
  ctx.box(0, 0, width, height);
  /** put the cursor to the end */
  ctx.cursor.restore();

  cb(null, true);

}
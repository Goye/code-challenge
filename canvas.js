#!/usr/bin/env node

/**
 * Module dependencies.
 */

var drawService  = require('./drawService'),
	  utilsService = require('./utilsService'),
	  cursor     	 = drawService.cursor;

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
      //console.log("drawn it", resp);
		});
});


/**
 * This function draw the canvas on the console
 * @param  {Integer} width  
 * @param  {Integer} height 
 * @return {Boolean} cb    
 */
function drawCanvas(width, height, cb){

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
  
  cursor.reset();
  cursor.goto(0, height + 2);
  cb(null, true);

}
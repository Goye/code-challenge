#!/usr/bin/env node

/**
 * Module dependencies.
 */

var drawService  = require('./drawService'),
	  utilsService = require('./utilsService'),
	  cursor     	 = drawService.cursor,
    fs           = drawService.fs;

module.exports = {
	startCanvas : startCanvas
}

var description = "draw canvas on the console";

/**
 * Get the params on the console
 */
utilsService.getParams(description, function (err, resp){

	var width  = resp.width || 0,
		height = resp.height || 0;

		startCanvas(width, height, function (err, resp){
      if (err) return console.error(err);
      //console.log("drawn it", resp);
		});
});


/**
 * This function make the logic to draw canvas
 * @param  {Integer} width  
 * @param  {Integer} height 
 * @return {Boolean} cb    
 */
function startCanvas(width, height, cb){

  var canvasObj = {
    width: width,
    height: height,
    type: 'canvas'
  }

  /** Draw */
  drawService.drawInConsole(canvasObj);
  /** write file */
  utilsService.writeFile({
    "canvas": canvasObj
  }, function(err, resp){
    if (err) return console.error(err);
    /** put the cursor to the end */
    drawService.resetCursor();
    cb(null, true);
  });
  
}
#!/usr/bin/env node

/**
 * Module dependencies.
 */

var drawService  = require('./drawService'),
	  utilsService = require('./utilsService'),
	  ctx     	   = drawService.axel,
    cursor       = drawService.cursor,
    fs           = drawService.fs,
    _            = drawService._;

module.exports = {
	startLine : startLine
}

var description = "draw line on the console";

/**
 * Get the params on the console
 */
utilsService.getParams(description, function (err, resp){

	var x1  = resp.firstLevelX || 2,
		  y1  = resp.firstLevelY || 2,
      x2  = resp.secondlevelX || 2,
      y2  = resp.secondlevelY || 2;

		startLine(x1, y1, x2, y2, function (err, resp){
      if (err) return console.error(err);
      //console.log("drawn it", resp);
		});
});

/**
 * This function make the logic to draw a line
 * @param  {Integer} x1 
 * @param  {Integer} y1 
 * @param  {Integer} x2 
 * @param  {Integer} y2 
 * @return {Boolean}   
 */
function startLine(x1, y1, x2, y2, cb){

  fs.readFile('./data/localStorage.json', function (err, data) {
    if (err) return console.error("it's necessary have a drawing canvas");
    var data = _.isEmpty(data) ? {} : JSON.parse(data);

    if(!_.isEmpty(data.canvas)){
      
      /** fix the limits */
      drawService.drawLineLimits(data.canvas, x1, y1, x2, y2, function (x1, y1, x2, y2){

        var lineObj = {
          x: x1,
          y: y1,
          X: x2,
          Y: y2,
          type: 'line'
        }
        /** hierarchy for canvas */
        drawService.drawInConsole(data.canvas);
        /** let's do the line or lines */
        drawService.drawStoreItem(lineObj, data.line, 'line', function(linesArray){

          data.line = linesArray;
          /** Save the line in the file */
          utilsService.writeFile(data, function(err, resp){
            if (err) return console.error(err);
            /** put the cursor to the end */
            drawService.resetCursor();
            cb(null, true);
          });

        });
        
      });  

    }
    
  });  

}
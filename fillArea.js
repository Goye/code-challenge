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
	startFill : startFill
}

var description = "fill an area in the console";

/**
 * Get the params on the console
 */
utilsService.getParams(description, function (err, resp){

	var width   = resp.width || 0,
		  height  = resp.height || 0,
      colour  = resp.colour || 'o';

		startFill(width, height, colour, function (err, resp){
      if (err) return console.error(err);
      //console.log("drawn it", resp);
		});
});

/**
 * This function make the logic to fill an area
 * @param  {Integer} width 
 * @param  {Integer} height 
 * @param  {String}  colour 
 * @return {Boolean}   
 */
function startFill(width, height, colour, cb){

  /** Read the file */
  fs.readFile('./data/localStorage.json', function (err, data) {
    if (err) return console.error("it's necessary have a drawing canvas");
    var data  = _.isEmpty(data) ? {} : JSON.parse(data);

    if(!_.isEmpty(data.canvas)){
      
      /** fix the limits */
      drawService.drawAreaLimits(data.canvas, width, height, function (width, height){

        /** hierarchy for canvas */
        drawService.drawInConsole(data.canvas);
        /** fill the area */
        var toFill = {
          width: width,
          height: height,
          colour: colour,
          type: 'fill'
        }
        drawService.drawInConsole(toFill);
        /** let's do the line or lines */
        if(!_.isEmpty(data.line)){

          for (var i in data.line){

             var toDraw = {
                x: data.line[i].x,
                y: data.line[i].y,
                X: data.line[i].X,
                Y: data.line[i].Y,
                type: 'line'
             }
             drawService.drawInConsole(toDraw);
          }

        }
        /** let's do the rectangle */
        if(!_.isEmpty(data.rectangle)){

          for (var i in data.rectangle){

             var toDraw = {
                x: data.rectangle[i].x,
                y: data.rectangle[i].y,
                X: data.rectangle[i].X,
                Y: data.rectangle[i].Y,
                type: 'rectangle'
             }
             drawService.drawInConsole(toDraw);
          }

        }

        /** put the cursor to the end */
        drawService.resetCursor();
        cb(null, true);
        
      });  

    }
    
  });  

}
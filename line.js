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
	startLine : startLine,
  lineLimits : lineLimits
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
      if (err) throw err;
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
    if (err) throw err;
    var data       = data ? JSON.parse(data) : {},
        linesArray = [];

    if(!_.isEmpty(data.canvas)){
      
      /** fix the limits */
      lineLimits(data.canvas, x1, y1, x2, y2, function (x1, y1, x2, y2){

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
        if(!_.isEmpty(data.line)){

          linesArray = data.line;
          delete lineObj.type;
          linesArray.push(lineObj);
          /** Remove repeated */
          linesArray = _.uniq(linesArray, function(line) { 
            return _.find(linesArray, { 'x': line.x, 'y': line.y, 'X': line.X, 'Y': line.Y });
          });

          for (var i in linesArray){

             var toDraw = {
                x: linesArray[i].x,
                y: linesArray[i].y,
                X: linesArray[i].X,
                Y: linesArray[i].Y,
                type: 'line'
             }
             drawService.drawInConsole(toDraw);
          }

        }else{

          drawService.drawInConsole(lineObj);
          linesArray.push(lineObj);

        }
        data.line = linesArray;
        /** Save the line in the file */
        utilsService.writeFile(data, function(err, resp){
          if (err) throw err;
          /** put the cursor to the end */
          drawService.resetCursor();
          cb(null, true);
        });
        
      });  

    }else{

      console.err("it's necessary have a drawing canvas");
      cb(true);

    }
    
  });  

}

/**
 * Fix the limits using the current canvas
 * @param  {Integer}  x1 
 * @param  {Integer}  y1 
 * @param  {Integer}  x2 
 * @param  {Integer}  y2
 */
function lineLimits(canvas, x1, y1, x2, y2, cb){

  x1 < 2 ? x1 = 2 : x1;
  x2 < 2 ? x2 = 2 : x2;
  y1 < 2 ? y1 = 2 : y1;
  y2 < 2 ? y2 = 2 : y2;

  if (x1 >= canvas.width ){
    x1 = canvas.width - 2;
  } 
  if (x2 >= canvas.width ){
    x2 = canvas.width - 2;
  }
  if(y1 >= canvas.height){
    y1 = canvas.height - 2;
  }
  if(y2 >= canvas.height){
    y2 = canvas.height - 2;
  }

  cb(x1, y1, x2, y2);

}
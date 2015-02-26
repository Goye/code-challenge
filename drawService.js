#!/usr/bin/env node

/**
 * Module dependencies.
 */

var commander  = require('commander'),
	ansi 	       = require('ansi'), 
	cursor       = ansi(process.stdout),
	axel         = require('axel'),
	fs			     = require('fs'),
	_ 			     = require('lodash');

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
	drawRectangle: drawRectangle,
	drawLineLimits: drawLineLimits,
	drawStoreItem: drawStoreItem,
  drawRectangleLimits: drawRectangleLimits,
  drawAreaLimits: drawAreaLimits,
  drawFill: drawFill
}

/**
 * This function reset the cursor pointer
 */
function resetCursor(){

	fs.readFile('./data/localStorage.json', function (err, data) {
	  if (err) return console.error(err);
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
      case 'fill':
          drawFill(params);
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

	var x1 = params.x || 2,
		  y1 = params.y || 2,
		  x2 = params.X || 2,
		  y2 = params.Y || 2;

	/** Drawing the line */
  axel.brush = "x";
  axel.line(x1, y1, x2, y2);

}

/**
 * This function draw a rectangle on the current canvas
 * @param  {Object} params
 */
function drawRectangle(params, filler){

	var x1     = params.x || 2,
		  y1     = params.y || 2,
		  width  = params.X || 2,
		  height = params.Y || 2,
      filler = filler || 'x',
      line   = '';
	/** Draw the box */
  for (x=0; x< width; x+=1) {
    line+= filler;
  }

  for (y=0; y< height; y+=1) {
    cursor.goto(x1,y1+y).write(line);
  }

}

/**
 * This function fill the canvas on the console
 * @param  {Object} params 
 */
function drawFill(params){

  var height = params.height || 2,
      width  = params.width  || 2,
      colour = params.colour || 'o';

  /** Draw the canvas */
  for (y=0; y< height; y+=1) {
    cursor.goto(width - 1, height - 1).write(colour);
    cursor.goto(0, height - 1).write(colour);
  }

  for (x=0; x< width; x+=1) {
    cursor.goto(0+x, height).write(colour);
    cursor.goto(0+x, height - 1).write(colour);
  }

}

/**
 * Fix the line limits using the current canvas
 * @param  {Integer}  x1 
 * @param  {Integer}  y1 
 * @param  {Integer}  x2 
 * @param  {Integer}  y2
 */
function drawLineLimits(canvas, x1, y1, x2, y2, cb){

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

/**
 * Draws the stored item in localStorage.json
 * @param  {Object}  object element to draw
 * @param  {Array}  data  
 * @param  {Array} cb     
 */
function drawStoreItem(object, data, type, cb){

  var itemArray = []; 
  
	if(!_.isEmpty(data)){

    itemArray = data;
    delete object.type;
    itemArray.push(object);
    /** Remove repeated */
    itemArray = _.uniq(itemArray, function(item) { 
      return _.find(itemArray, { 'x': item.x, 'y': item.y, 'X': item.X, 'Y': item.Y });
    });

    for (var i in itemArray){

       var toDraw = {
          x: itemArray[i].x,
          y: itemArray[i].y,
          X: itemArray[i].X,
          Y: itemArray[i].Y,
          type: type
       }
       drawInConsole(toDraw);
    }

  }else{

    drawInConsole(object);
    itemArray.push(object);

  }
  cb(itemArray);  

}

/**
 * Fix the rectangle limits using the current canvas
 * @param  {Integer}  x1 
 * @param  {Integer}  y1 
 * @param  {Integer}  x2 
 * @param  {Integer}  y2
 */
function drawRectangleLimits(canvas, x1, y1, x2, y2, cb){

  x1 < 2 ? x1 = 2 : x1;
  x2 < 2 ? x2 = 2 : x2;
  y1 < 2 ? y1 = 2 : y1;
  y2 < 2 ? y2 = 2 : y2;
  var valMax = (canvas.width / canvas.height) - 3;
  
  if (x1 >= canvas.width - 3){
    x1 = canvas.width - 3;
    x2 = Math.floor(valMax);
  } 
  if ((x1 + x2) >= canvas.width ){
    x2 = Math.floor(valMax);
  }
  if(y1 >= canvas.height){
    y1 = canvas.height - 2;
    y2 = Math.floor(valMax);
  }
  if((y1 + y2)>= canvas.height){
    y2 = Math.floor(valMax);
  }

  cb(x1, y1, x2, y2);

}

function drawAreaLimits(canvas, width, height, cb){

  width  < 2 ? width = 2 : width;
  height < 2 ? height = 2 : height;

  if(width >= canvas.width){
    width = canvas.width - 1;
  }

  if(height >= canvas.height){
    height = canvas.height - 1;
  }

  cb(width, height);

}

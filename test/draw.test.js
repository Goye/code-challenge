var drawService = require('../drawService'),
	fixtures    = require('./fixtures/draw');

describe('Draw Service', function() {

  var canvasObj = {}; 	

  describe('attribute methods()', function(){
    it('can drawCanvas()', function(done){
      	canvasObj = {
      		height: fixtures.height,
      		width: fixtures.width
      	}
        drawService.drawCanvas(canvasObj);
        done();
    });

    it('can drawLine()', function(done){
      	var lineObj = {
      		x: fixtures.x,
      		y: fixtures.y,
      		X: fixtures.X,
      		Y: fixtures.Y
      	}
        drawService.drawLine(lineObj);
        done();
    });

    it('can drawRectangle()', function(done){
      	var rectangleObj = {
      		x: fixtures.x,
      		y: fixtures.y,
      		X: fixtures.X,
      		Y: fixtures.Y
      	}
        drawService.drawRectangle(rectangleObj);
        done();
    });

    it('can fill area()', function(done){
      	var fillObj = {
      		height: fixtures.height,
          width: fixtures.width,
          colour: fixtures.colour
      	}
        drawService.drawFill(fillObj);
        done();
    });
  });

});
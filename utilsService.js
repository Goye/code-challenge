#!/usr/bin/env node

/**
 * Module dependencies.
 */

var drawService = require('./drawService'),
	program     = drawService.commander;

module.exports = {
	getParams: getParams
}

/**
 * Gets the data of the user on the console and return the params
 * @param  {String}  description 
 * @return  {Object} cb          
 */
function getParams (description, cb){

	program
	.version('0.0.1')
	.description(description)
	.option('-w, --width <n>', 'canvas width', parseInt)
	.option('-h, --height <n>', 'canvas height', parseInt)
	.option('-x, --firstLevelX <n>', 'x space', parseInt)
	.option('-y, --firstLevelY <n>', 'y space', parseInt)
	.option('-X, --secondlevelX <n>', 'x2 space', parseInt)
	.option('-Y, --secondlevelY <n>', 'y2 space', parseInt)
	.option('-c, --colour <n>', 'colour param')
	.parse(process.argv);

	if (process.argv.length <= 2){
		program.help();
	} else{ 
		cb(null, program);
	}

}



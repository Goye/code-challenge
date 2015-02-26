#!/usr/bin/env node

/**
 * Module dependencies.
 */

var drawService = require('./drawService'),
	program     = drawService.commander,
	fs          = drawService.fs;

module.exports = {
	getParams: getParams,
	paramsValidations: paramsValidations,
	writeFile: writeFile
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

		if(!paramsValidations(process.argv)){
			console.error("The numbers cannot be less than 0");
		}else{
			cb(null, program);
		}
		
	}

}

/**
 * This function validates the current values
 * @param  {arg} arguments 
 * @return {Boolean}  
 */
function paramsValidations(arg){
	//var stringValidation = /^[\w]+$/.test(c);
	var isNatural = true;
	for (var i in arg){
		var value = parseInt(arg[i]);
		if(!isNaN(value)){
			isNatural = isNatural && value >= 0;
		}
	}
	return isNatural;
}

/**
 * create the file with the current object
 * @param  {Object}   Object 
 * @return {Boolean} cb   
 */
function writeFile(Object, cb){

	 /** write file */
  	fs.writeFile('./data/localStorage.json', JSON.stringify(Object), function (err) {
    	if (err) return cb(err);
    	cb(null, true)
    });
}



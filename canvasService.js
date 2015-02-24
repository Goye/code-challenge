#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
  .version('0.0.1')
  .option('-w, --width <n>', 'canvas width', parseInt)
  .option('-h, --height <n>', 'canvas height', parseInt)
  .parse(process.argv);

if (!program.args.length) program.help();


  console.log(' w: %j', program.width);
  console.log(' h: %j', program.height);
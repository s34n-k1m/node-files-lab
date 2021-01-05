"use strict";

const fsP = require("fs/promises");
const axios = require("axios");

/* Read files from the inputted path and console log the content */
async function cat(path) {
  let fileContent;
  
  try {
    // Code Review Note: Only have try do ONE THING
    fileContent = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  
  console.log(fileContent);
  return fileContent;
}

/** If --out is passed, should write content from file into file specified
 * node step3.js --out <file to write to> <file to read from>
 */

async function writeCat(write, read) {
  let content = await cat(read);
  try {
    await fsP.writeFile(write, content, 'utf8');
  } catch (err) {
    console.log(err);
    process.exit(2);
  }
}

/* Read content from a URL and print to console */

async function webCat(url) {
  try {
    let resp = await axios({url});
    console.log(resp.data);
  } catch (err) {
    console.log(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }

}

/** If --out is passed, should write content from url into file specified
 * node step3.js --out <file to write to> <url to read from>
 */

/* Checks whether path is URL or File and calls appropriate function */

async function readContent(path) {
  // TODO: look up URL class on MDN
  
  let isURL = true;
  
  try {
    let url = new URL(path);
  } catch (TypeError) {
    isURL = false;
  }
  
  if (isURL) {
    await webCat(path);
  } else {
    await cat(path);
  }
}

readContent(process.argv[process.argv.length - 1]);
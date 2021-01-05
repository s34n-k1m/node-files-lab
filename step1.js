"use strict";

const fsP = require("fs/promises");

/* Read files from the inputted path and console log the content */
async function cat(path) {
  try {
    let fileContent = await fsP.readFile(path, "utf8");
    console.log(fileContent);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  
}

cat(process.argv[process.argv.length - 1]);

// module.exports = {
//   cat: cat
// };
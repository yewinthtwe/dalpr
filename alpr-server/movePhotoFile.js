const fs = require("fs");

const tempFolder = "/home/alprsvr/plateimagesTemp/";
const storeFolder = "/home/alprsvr/plateimages/";
const oldFile = "mgw-cam2-1644085954263.jpg";
const newFile = "mgw-cam2-1644085954263.jpg";

fs.rename(`${tempFolder}`+ oldFile, `${storeFolder}`+ newFile, (err) => {
  if (err) throw err;
  console.log('Rename complete!');
});
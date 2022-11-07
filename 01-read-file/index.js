const path = require("path");
const fs = require("fs");

const textFilePath = path.join(__dirname, "text.txt");
const readStream = fs.createReadStream(textFilePath, "utf-8");
let text = "";

readStream.on('data', data => text+=data);
readStream.on('end', () => console.log(text));


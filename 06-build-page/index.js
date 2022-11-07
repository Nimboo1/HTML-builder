const fs = require("fs");
const path = require("path");
const readline = require('readline'); 

const dest = path.join(__dirname, "project-dist");
fs.mkdir(dest, { recursive: true }, (err) => { if (err) throw err; });

const output = path.join(dest, "index.html");

const readInterface = readline.createInterface({ 
    input: fs.createReadStream(path.join(__dirname, "template.html")), 
    output: null, 
    console: false 
}); 
let htmlStr = "";
readInterface.on('line', function(line) { 
    let str = line.toString();
    htmlStr = htmlStr + str + "\n";
});
let arr;
let count = 0;
readInterface.on('close', function() { 
    arr = htmlStr.split("\n");
    arr.forEach((item) => {
        if (item.includes("{{") && item.includes("}}")) {
            count++;
        }
    });
    arr.forEach((item, index, arr) => {
        if (item.includes("{{") && item.includes("}}")) {
            const name = item.trim().slice(2, item.trim().length - 2);
            const filePath = path.join(__dirname, "components/" + name + ".html");
            const input = fs.createReadStream(filePath, "utf-8");

            let i = index;
            let text = "";
            input.on('data', data => {
                text+=data;
            });
            input.on('end', () => {
                arr[i] = text;
                count--;
                if (count == 0) {
                    let string = arr.join("\n");
                    const writeStream = fs.createWriteStream(output);
                    writeStream.write(string);
                }
            });
        }
    });
});

let cssPath = path.join(__dirname, "styles");
let cssDest = path.join(dest, "style.css");
const cssOutput = fs.createWriteStream(cssDest);
fs.readdir(
    cssPath, 
    { withFileTypes: true },
    (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                if (file.isFile() && file.name.toString().split(".")[1] == "css") {
                    let filePath = path.join(cssPath, file.name.toString());
                    
                    const input = fs.createReadStream(filePath, "utf-8");
                    input.pipe(cssOutput);
                }
            });
        }
    }
);

let copyPath = path.join(__dirname, "assets");
let destination = path.join(__dirname, "project-dist/assets");
copyDir(copyPath, destination);

function copyDir(folder, dest) {
    fs.rm(dest, {recursive: true, force: true}, (err) => {
        fs.mkdir(dest, { recursive: true }, (err) => { if (err) throw err; });
        fs.readdir(
            folder, 
            { withFileTypes: true },
            (err, files) => {
                if (err)
                    console.log(err);
                else {
                    files.forEach(file => {
                        let filePath = path.join(folder, file.name.toString());
                        let destPath = path.join(dest, file.name.toString());
                        if (file.isFile()) {                                    
                            fs.copyFile(filePath, destPath, (err) => {
                                if (err) {
                                  console.log("Error Found:", err);
                                }   
                            });
                        } else {                     
                            copyDir(filePath, destPath);
                        }
                    });
                }
            }
        );
    });
}
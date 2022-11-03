const fs = require("fs");
const path = require("path");

let sourcePath = path.join(__dirname, "styles");
let dest = path.join(__dirname, "project-dist/bundle.css");

const output = fs.createWriteStream(dest);

fs.readdir(
    sourcePath, 
    { withFileTypes: true },
    (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                if (file.isFile() && file.name.toString().split(".")[1] == "css") {
                    let filePath = path.join(sourcePath, file.name.toString());
                    
                    const input = fs.createReadStream(filePath, "utf-8");
                    input.pipe(output);
                }
            });
        }
    }
);


const fs = require('fs');
const path = require("path");

let folderPath = path.join(__dirname, "files");
let destination = path.join(__dirname, "files-copy");

copyDir(folderPath, destination);

function copyDir(folder, dest) {
    fs.mkdir(dest, { recursive: true }, (err) => { if (err) throw err; });

    fs.readdir(
        folder, 
        { withFileTypes: true },
        (err, files) => {
            if (err)
                console.log(err);
            else {
                files.forEach(file => {
                    if (file.isFile()) {
                        let filePath = path.join(folderPath, file.name.toString());
                        let destPath = path.join(dest, file.name.toString());
                        
                        fs.copyFile(filePath, destPath, (err) => {
                            if (err) {
                              console.log("Error Found:", err);
                            }   
                        });
                    }
                });
            }
        }
    );
}


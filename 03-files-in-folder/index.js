const fs = require('fs');
const path = require("path");

const folderPath = path.join(__dirname, "/secret-folder");

fs.readdir(
    folderPath, 
    { withFileTypes: true },
    (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                if (file.isFile()) {
                    let filePath = path.join(folderPath, file.name.toString());
                    
                    fs.stat(filePath, (err, stats) => {
                        let name = file.name.toString().split(".")[0];
                        let ext = file.name.toString().split(".")[1];
                        let weight = stats.size;
                        console.log(name + " - " + ext + " - " + weight);
                    });
                }
            });
        }
    }
);
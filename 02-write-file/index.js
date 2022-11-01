const fs = require('fs');
const path = require("path");

const textFilePath = path.join(__dirname, "text.txt");
const writeStream = fs.createWriteStream(textFilePath);


process.on("exit", () => {
    writeStream.end();
    console.log("Запись завершена");
});

process.on("SIGINT", () => {
    process.exit();
});

console.log("Введите текст: ");
process.stdin.on("data", data => {
    const text = data.toString().trim();
    if (text == "exit") {
        process.exit();
    }
    writeStream.write(data);
    console.log("Введите текст: ");
});



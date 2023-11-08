const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n ${err}`);
        } else {
            console.log(data);
        }
    });
}

const filePath = process.argv[2];

if (filePath) {
    cat(filePath);
} else {
    console.log('Usage: node step1.js <path-to-file>');
}
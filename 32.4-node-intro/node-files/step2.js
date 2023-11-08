const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n ${err}`);
        } else {
            console.log(data);
        }
    });
}

function webCat(url) {
    axios.get(url)
        .then(response => {
            console.log(response.data);
        })
    .catch(error => {
            console.error(`Error fetching ${url}:\n ${error}`);
        });
}

const arg = process.argv[2];

if (arg) {
    if (arg.startsWith('http://') || arg.startsWith('https://')) {
        webCat(arg);
    } else {
        cat(arg);
    }
} else {
    console.log('Usage: node step2.js <path-to-file-or-url>');
}
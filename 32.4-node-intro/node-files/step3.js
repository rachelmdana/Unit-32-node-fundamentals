const fs = require('fs');
const axios = require('axios');

function cat(path, callback) {
  fs.readFile(path, 'utf8', callback);
}

function webCat(url, callback) {
  axios.get(url)
    .then(response => {
      callback(null, response.data);
    })
    .catch(error => {
      callback(error, null);
    });
}

function writeOutputFile(outputPath, content, callback) {
  fs.writeFile(outputPath, content, 'utf8', callback);
}

const args = process.argv.slice(2);

if (args.length >= 2 && args[0] === '--out') {
  const outputPath = args[1];
  const target = args[2];

  const catOrWebCat = target.startsWith('http://') || target.startsWith('https://') ? webCat : cat;

  catOrWebCat(target, (err, content) => {
    if (err) {
      console.error(`Error reading or fetching ${target}:\n  ${err}`);
    } else {
      writeOutputFile(outputPath, content, (err) => {
        if (err) {
          console.error(`Couldn't write to ${outputPath}:\n  ${err}`);
        }
      });
    }
  });
} else if (args.length === 1) {
  const target = args[0];
  const catOrWebCat = target.startsWith('http://') || target.startsWith('https://') ? webCat : cat;
  catOrWebCat(target, (err, content) => {
    if (err) {
      console.error(`Error reading or fetching ${target}:\n  ${err}`);
    } else {
      console.log(content);
    }
  });
} else {
  console.log('Usage: node step3.js [--out output-filename.txt] readfile-or-url');
}

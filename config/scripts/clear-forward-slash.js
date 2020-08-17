/* eslint-disable no-console */
const fs = require('fs');

const path = './dist/index.html';

console.log('Clearing forward slash of script:src and href in index.html...');
console.log('Reading file...');
const indexHTML = fs.readFileSync(path, 'utf-8');

console.log('Writing modified file...');
fs.writeFileSync(path, indexHTML.replace(/(<script src="|href=")\//g, '$1'));

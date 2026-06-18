const fs = require('fs');
const path = './src/data/products.ts';
let data = fs.readFileSync(path, 'utf8');
const startStr = '  {\n    slug: "bpc-157"';
const endStr = '  {\n    slug: "wolverine-stack"';
const startIndex = data.indexOf(startStr);
const endIndex = data.indexOf(endStr);
if (startIndex !== -1 && endIndex !== -1) {
  fs.writeFileSync(path, data.slice(0, startIndex) + data.slice(endIndex));
  console.log('Successfully removed products!');
} else {
  console.log('Could not find start or end string', startIndex, endIndex);
}

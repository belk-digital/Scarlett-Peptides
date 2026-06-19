const fs = require('fs');
const file = './src/data/products.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace category: "Something" with category: "Something Research"
content = content.replace(/category:\s*"([^"]+)"/g, (match, p1) => {
    if (!p1.endsWith('Research')) {
        return `category: "${p1} Research"`;
    }
    return match;
});

fs.writeFileSync(file, content, 'utf8');
console.log('Categories updated with "Research"');

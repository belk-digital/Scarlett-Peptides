const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../Product images');
const destDir = path.join(__dirname, '../public/images/products');

// Ensure destination exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Map of files we want to KEEP and move to public/images/products
const keepFiles = [
  'GLOW.jpg',
  'KLOW.jpg',
  'GHK-CU 50mg.jpg',
  'GHK-CU 100mg.jpg',
  'GHK-CU 200mg.jpg',
  'Mots-c 10mg.jpg',
  'Mots-c 40mg.jpg',
  'Retatrutide 10mg.jpg',
  'Retatrutide 20mg.jpg',
  'Retatrutide 30mg.jpg',
  'Retatrutide 100mg.jpg',
  'NAD+ 500mg.jpg',
  'NAD 1000mg.jpg',
  'Glutathione 200mg.jpg',
  'BPC-157 10mg.jpg',
  'BPC-157 20mg.jpg',
  'KPV 10mg.jpg',
  'TB-500 10mg.jpg'
];

let successCount = 0;

// Copy kept files
for (const file of keepFiles) {
  const src = path.join(sourceDir, file);
  // Rename spaces and special chars for web safety
  const safeName = file.replace(/\+/g, 'plus').replace(/ /g, '-').toLowerCase();
  const dest = path.join(destDir, safeName);
  
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${file} -> ${safeName}`);
    successCount++;
  } else {
    console.warn(`WARNING: Missing file ${file}`);
  }
}

console.log(`Successfully copied ${successCount} images to public directory.`);

// Now we need to delete the entire original "Product images" folder and all its contents
try {
  fs.rmSync(sourceDir, { recursive: true, force: true });
  console.log(`Deleted original source directory to clean up ${205 - successCount} unused images.`);
} catch (e) {
  console.error("Error deleting source directory:", e);
}

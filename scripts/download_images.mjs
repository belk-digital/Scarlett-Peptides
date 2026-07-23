import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

const BASE_URL = "https://pub-82f90d490a8048aa9629f0ae3ea6f567.r2.dev/Product%20Images/";
const TARGET_DIR = path.join(process.cwd(), "public", "images", "products");

const filesToDownload = {
  "10 Needles-1.webp": "10-needles.webp",
  "BAC water.webp": "bac-water.webp",
  "BAC WATER 3ML.webp": "bac-water-3ml.webp",
  "BAC WATER 10ML.webp": "bac-water-10ml.webp",
  "BAC Water (Bacteriostatic Water) 30ML.webp": "bac-water-30ml.webp",
  "GLOW 70mg.webp": "glow.webp",
  "KLOW.webp": "klow.webp",
  "GHK-CU 50mg.webp": "ghk-cu-50mg.webp",
  "GHK-CU 100mg.webp": "ghk-cu-100mg.webp",
  "MOTS-C 10mg.webp": "mots-c-10mg.webp",
  "MOTS-C 40mg.webp": "mots-c-40mg.webp",
  "NAD+ 500mg.webp": "nadplus-500mg.webp",
  "NAD+ 1000mg.webp": "nadplus-1000mg.webp",
  "GLUTATHIONE  600mg.webp": "glutathione-600mg.webp",
  "GLUTATHIONE 1500mg.webp": "glutathione-1500mg.webp",
  "BPC-157 TB-500 MIX 5mg 5mg.webp": "wolverine-5-5-mg.webp",
  "BPC-157 TB-500 MIX 10mg 10mg.webp": "wolverine-10-10-mg.webp",
  "RETATRUTIDE 10mg.webp": "retatrutide-10mg.webp",
  "RETATRUTIDE 20mg.webp": "retatrutide-20mg.webp",
  "RETATRUTIDE 30mg.webp": "retatrutide-30mg.webp",
  "RETATRUTIDE 60mg.webp": "retatrutide-60mg.webp",
};

async function downloadFile(url, destination) {
  console.log(`Downloading ${url} to ${destination}`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.statusText}`);
  }
  const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
  await finished(Readable.fromWeb(res.body).pipe(fileStream));
}

async function run() {
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  for (const [source, dest] of Object.entries(filesToDownload)) {
    const url = BASE_URL + encodeURIComponent(source);
    const destination = path.join(TARGET_DIR, dest);
    
    // Remove if exists to overwrite with downloaded file
    if (fs.existsSync(destination)) {
      fs.unlinkSync(destination);
    }
    
    try {
      await downloadFile(url, destination);
    } catch (err) {
      console.error(err.message);
    }
  }
  console.log("Downloads completed.");
}

run();

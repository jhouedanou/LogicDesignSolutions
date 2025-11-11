const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imagesToConvert = [
  'public/assets/images/backgrounds/logic-slider-1.png',
  'public/assets/images/backgrounds/logic-slider-2.png',
  'public/assets/images/backgrounds/logic-slider-3.png',
];

async function convertImages() {
  for (const imagePath of imagesToConvert) {
    const fullPath = path.join(__dirname, imagePath);
    const outputPath = fullPath.replace('.png', '.webp');

    try {
      await sharp(fullPath)
        .webp({ quality: 80 })
        .toFile(outputPath);

      console.log(`✓ Converted ${imagePath} to ${outputPath}`);
    } catch (err) {
      console.error(`✗ Failed to convert ${imagePath}:`, err.message);
    }
  }
}

convertImages().then(() => {
  console.log('Image conversion complete!');
  process.exit(0);
}).catch(err => {
  console.error('Conversion failed:', err);
  process.exit(1);
});

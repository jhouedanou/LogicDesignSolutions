const path = require('path');
const fs = require('fs');

const imagesToConvert = [
  'public/assets/images/backgrounds/logic-slider-1.png',
  'public/assets/images/backgrounds/logic-slider-2.png',
  'public/assets/images/backgrounds/logic-slider-3.png',
];

async function convertImages() {
  // Vérifier si sharp est disponible
  let sharp;
  try {
    sharp = require('sharp');
  } catch (err) {
    console.warn('⚠️  Sharp n\'est pas disponible, conversion des images ignorée');
    console.warn('💡 Veuillez pré-convertir les images en local avant le déploiement');
    return;
  }

  for (const imagePath of imagesToConvert) {
    const fullPath = path.join(__dirname, imagePath);
    const outputPath = fullPath.replace('.png', '.webp');

    // Vérifier si l'image WebP existe déjà
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipped ${imagePath} (WebP existe déjà)`);
      continue;
    }

    // Vérifier si l'image source existe
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️  Source non trouvée: ${imagePath}`);
      continue;
    }

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

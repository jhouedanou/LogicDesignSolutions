const fs = require('fs');
const path = require('path');

// List of CSS files to merge
const cssFiles = [
  'public/assets/vendors/bootstrap/css/bootstrap.min.css',
  'public/assets/vendors/animate/animate.min.css',
  'public/assets/vendors/animate/custom-animate.css',
  'public/assets/vendors/fontawesome/css/all.min.css',
  'public/assets/vendors/jarallax/jarallax.css',
  'public/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.css',
  'public/assets/vendors/odometer/odometer.min.css',
  'public/assets/vendors/swiper/swiper.min.css',
  'public/assets/vendors/smartbiz-icons/style.css',
  'public/assets/vendors/owl-carousel/owl.carousel.min.css',
  'public/assets/vendors/owl-carousel/owl.theme.default.min.css',
  'public/assets/vendors/bootstrap-select/css/bootstrap-select.min.css',
  'public/assets/vendors/jquery-ui/jquery-ui.css',
  'public/assets/css/smartbiz.css',
  'public/assets/css/smartbiz-responsive.css',
  'public/assets/css/logic-custom.css'
];

// List of JS files to merge
const jsFiles = [
  'public/assets/vendors/jquery/jquery-3.6.0.min.js',
  'public/assets/vendors/jquery-migrate/jquery-migrate-3.3.2.min.js',
  'public/assets/vendors/bootstrap/js/bootstrap.bundle.min.js',
  'public/assets/vendors/appear/jquery.appear.js',
  'public/assets/vendors/circle-progress/jquery.circle-progress.min.js',
  'public/assets/vendors/circle-type/jquery.circleType.min.js',
  'public/assets/vendors/jarallax/jarallax.min.js',
  'public/assets/vendors/jarallax/jarallax-video.min.js',
  'public/assets/vendors/jquery-magnific-popup/jquery.magnific-popup.min.js',
  'public/assets/vendors/isotope/isotope.pkg.min.js',
  'public/assets/vendors/odometer/odometer.min.js',
  'public/assets/vendors/owl-carousel/owl.carousel.min.js',
  'public/assets/vendors/swiper/swiper.min.js',
  'public/assets/vendors/wnumb/wNumb.js',
  'public/assets/vendors/wow/wow.min.js',
  'public/assets/vendors/bootstrap-select/js/bootstrap-select.min.js',
  'public/assets/vendors/jquery-ui/jquery-ui.js',
  'public/assets/vendors/jquery-validate/jquery.validate.min.js',
  'public/assets/vendors/jquery-ajaxchimp/jquery.ajaxchimp.min.js',
  'public/assets/vendors/nouislider/nouislider.min.js',
  'public/assets/js/smartbiz.js'
];

// Helper to read file
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.warn(`⚠️  Could not read file: ${filePath}`);
    return '';
  }
}

// Merge CSS files
console.log('Merging CSS files...');
let mergedCSS = '';
cssFiles.forEach((file, index) => {
  const content = readFile(file);
  if (content) {
    mergedCSS += `/* ${path.basename(file)} */\n${content}\n\n`;
    console.log(`✓ ${index + 1}. ${path.basename(file)}`);
  }
});

fs.writeFileSync('public/assets/css/merged-vendors.min.css', mergedCSS);
console.log(`\n✅ Merged CSS file created: public/assets/css/merged-vendors.min.css`);

// Merge JS files
console.log('\nMerging JS files...');
let mergedJS = '';
jsFiles.forEach((file, index) => {
  const content = readFile(file);
  if (content) {
    mergedJS += `/* ${path.basename(file)} */\n${content}\n\n`;
    console.log(`✓ ${index + 1}. ${path.basename(file)}`);
  }
});

fs.writeFileSync('public/assets/js/merged-vendors.min.js', mergedJS);
console.log(`\n✅ Merged JS file created: public/assets/js/merged-vendors.min.js`);

// Print file sizes
const cssSize = (mergedCSS.length / 1024).toFixed(2);
const jsSize = (mergedJS.length / 1024).toFixed(2);
console.log(`\n📊 File Sizes:`);
console.log(`   CSS: ${cssSize} KB`);
console.log(`   JS:  ${jsSize} KB`);

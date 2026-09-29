import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('src');
const publicAssetsDir = path.resolve('public/assets');

// Check all image strings in src files
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getFiles(srcDir);
const assetRegex = /\/assets\/[a-zA-Z0-9_\-\.\/]+/g;
const missingAssets = new Set();
const foundAssets = new Set();

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(assetRegex) || [];
  matches.forEach(m => {
    // clean query or hash if any
    const cleanPath = m.replace(/[?#].*$/, '');
    const relativePart = cleanPath.replace(/^\/assets\//, '');
    const absoluteAsset = path.join(publicAssetsDir, relativePart);
    if (fs.existsSync(absoluteAsset)) {
      foundAssets.add(cleanPath);
    } else {
      missingAssets.add(`${cleanPath} (referenced in ${path.relative(process.cwd(), file)})`);
    }
  });

  // check for stale /images/
  if (content.includes('/images/')) {
    console.error(`STALE /images/ FOUND IN: ${file}`);
  }
});

console.log(`Verified ${foundAssets.size} unique /assets/ references:`);
foundAssets.forEach(a => console.log(`  ✓ ${a}`));

if (missingAssets.size > 0) {
  console.error(`\nFAILED: Found ${missingAssets.size} missing assets:`);
  missingAssets.forEach(m => console.error(`  ✗ ${m}`));
  process.exit(1);
} else {
  console.log('\nSUCCESS: All asset references exist on disk!');
}

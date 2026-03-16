const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(/\bbg-white\b/g, 'bg-bg-brutal')
                       .replace(/\btext-white\b/g, 'text-bg-brutal')
                       .replace(/\bborder-white\b/g, 'border-bg-brutal')
                       .replace(/\bbg-black\b/g, 'bg-secondary-brutal') // Teal is secondary
                       .replace(/\btext-black\b/g, 'text-text-brutal')
                       .replace(/\bborder-black\b/g, 'border-border-brutal');
                       
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir('./src/components');
console.log("Replacement complete.");

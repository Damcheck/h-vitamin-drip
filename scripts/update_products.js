const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../lib/products.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace UK with Nigeria
content = content.replace(/UK/g, 'Nigeria');
content = content.replace(/£/g, '₦');

// Multiply prices by 1000
content = content.replace(/price: (\d+)/g, (match, p1) => {
  return `price: ${parseInt(p1) * 1000}`;
});

fs.writeFileSync(filePath, content);
console.log("Updated products.ts");

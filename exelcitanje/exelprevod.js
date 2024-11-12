const fs = require('fs');
const csv = require('csv-parser');

function csvToTsxFormat(filePath, outputFile) {
  const translations = { en: {}, rs: {}, ru: {} };

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      const key = row['key']?.trim();
      translations.en[key] = row[' en']?.trim();
      translations.rs[key] = row[' rs']?.trim();
      translations.ru[key] = row[' ru']?.trim();
    })
    .on('end', () => {
      const content = `export const languages = ${JSON.stringify(translations, null, 2)};`;
      fs.writeFileSync(outputFile, content);
    });
}

csvToTsxFormat('test.csv', 'prevod.tsx');

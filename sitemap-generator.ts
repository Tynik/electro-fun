import { writeFile, readFile } from 'fs';

import { generateItemId } from './src/utils';

readFile('./src/db.json', (err, data) => {
  if (err) throw err;

  let db = JSON.parse(data as any);

  const sitemapData = db.items.map((item) =>
    'https://electro-fun.site/#/item/' + generateItemId(item.title)
  ).join('\n');

  writeFile('sitemap.txt', sitemapData, (err => {
    if (err) throw err;

    console.log('The sitemap.txt has been created');
  }));
});


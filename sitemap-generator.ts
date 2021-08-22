import { writeFile, readFile } from 'fs';

import { generateItemId } from './src/utils';

readFile('./src/db/db.1.json', (err, data) => {
  if (err) throw err;

  let db = JSON.parse(data as any);

  const sitemapData = db.items.map((item) =>
    'https://electro-fun.site/#/item/' + generateItemId(item.title)
  );
  sitemapData.push('https://electro-fun.site/');

  writeFile('sitemap.txt', sitemapData.join('\n'), (err => {
    if (err) throw err;

    console.info('The sitemap.txt has been created');
  }));
});

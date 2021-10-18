import { readFileSync, writeFileSync } from 'fs';
import { generateItemId } from './src/utils';
import { Db, DbMeta } from './src/types';

const generateSitemapData = (): string[] => {
  const metadata = readFileSync('./src/db/db.meta.json');
  const meta: DbMeta = JSON.parse(metadata as any);

  let sitemapData = [
    'https://smart-home-tech.com.ua/',
    'https://smart-home-tech.com.ua/datasheets'
  ];

  Array.from(new Array(meta.parts)).forEach((_, part) => {
    const dbPartData = readFileSync(`./src/db/db.${part + 1}.json`);
    const dbPart: Db = JSON.parse(dbPartData as any);

    sitemapData = [
      ...sitemapData,
      ...dbPart.items.map((item) =>
        'https://smart-home-tech.com.ua/item/' + generateItemId(item.title)
      )
    ];
  });
  return sitemapData;
};

const run = () => {
  const sitemapData = generateSitemapData();

  writeFileSync('sitemap.txt', sitemapData.join('\n'));

  console.info('The sitemap.txt has been created');
};

run();

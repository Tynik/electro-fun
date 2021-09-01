import { readFileSync, writeFileSync } from 'fs';
import { generateItemId } from './src/utils';
import { Db, DbMeta } from './src/types';

const generateSitemapData = (): string[] => {
  const metadata = readFileSync('./src/db/db.meta.json');
  const meta: DbMeta = JSON.parse(metadata as any);

  let sitemapData = [
    'https://electro-fun.site/',
    'https://electro-fun.site/#/datasheets'
  ];

  Array.from(new Array(meta.parts)).forEach((_, part) => {
    const dbPartData = readFileSync(`./src/db/db.${part + 1}.json`);
    const dbPart: Db = JSON.parse(dbPartData as any);

    sitemapData = [
      ...sitemapData,
      ...dbPart.items.map((item) =>
        'https://electro-fun.site/#/item/' + generateItemId(item.title)
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

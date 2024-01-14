import { writeFileSync } from 'fs';
import { getProductLink, readDb } from './helpers';
import { SITE_DOMAIN } from './constants';

const generateSitemapData = (): string[] => {
  let sitemapData = [SITE_DOMAIN, `${SITE_DOMAIN}/datasheets`];

  readDb(dbPart => {
    sitemapData = [...sitemapData, ...dbPart.items.map(getProductLink)];
  });

  return sitemapData;
};

const run = () => {
  const sitemapData = generateSitemapData();

  writeFileSync('sitemap.txt', sitemapData.join('\n'));

  console.info('The sitemap.txt has been created');
};

run();

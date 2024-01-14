import { writeFileSync, appendFileSync } from 'fs';
import { getProductLink, readDb } from './helpers';
import { generateItemId } from '../src/utils';
import { SITE_DOMAIN } from './constants';

const PRODUCTS_FILENAME = 'products.txt';

const COLUMNS = ['id', 'title', 'description', 'price', 'availability', 'image_link', 'link'];

type Products = (string | number)[][];

const run = () => {
  const productsData: Products = [];

  readDb(dbPart => {
    dbPart.items.forEach(item => {
      if (typeof item.price !== 'number') {
        return;
      }

      if (!item.images.length) {
        console.warn(`Images are missing for item "${item.title}"`);
        return;
      }

      if (item.seo) {
        productsData.push([
          generateItemId(item.title),
          `"${item.title}"`,
          `"${item.seo.description}"`,
          item.price,
          item.availability ? 'in_stock' : 'out_of_stock',
          item.images[0].src.startsWith('http')
            ? item.images[0].src
            : `${SITE_DOMAIN}/item` + item.images[0].src,
          getProductLink(item),
        ]);
      }
    });
  });

  writeFileSync(PRODUCTS_FILENAME, `${COLUMNS.join('\t')}\n`);

  productsData.forEach(product => {
    appendFileSync(PRODUCTS_FILENAME, `${product.join('\t')}\n`);
  });
};

run();

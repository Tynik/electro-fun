import { writeFileSync, appendFileSync } from 'fs';
import { getProductLink, readDb } from './helpers';
import { generateItemId } from '../src/utils';

const PRODUCTS_FILENAME = 'products.txt';

const COLUMNS = ['id', 'title', 'link'];

type Products = string[][];

const run = () => {
  const productsData: Products = [];

  readDb(dbPart => {
    dbPart.items.forEach(item => {
      productsData.push([generateItemId(item.title), item.title, getProductLink(item)]);
    });
  });

  writeFileSync(PRODUCTS_FILENAME, `${COLUMNS.join('  ')}\n`);

  productsData.forEach(product => {
    appendFileSync(PRODUCTS_FILENAME, `${product.map(p => `"${p}"`).join('  ')}\n`);
  });
};

run();

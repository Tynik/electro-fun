import { writeFileSync, appendFileSync } from 'fs';
import { getProductLink, readDb } from './helpers';
import { generateItemId } from '../src/utils';
import { SITE_DOMAIN } from './constants';

const wrapInDoubleQuotes = (value: string) => `"${value}"`;

const PRODUCTS_FILENAME = 'products.txt';

const MAX_PRODUCT_ADDITIONAL_IMAGES = 10;

const COLUMNS = [
  'id',
  'title',
  'description',
  'price',
  'availability',
  'image_link',
  ...Array.from(new Array(MAX_PRODUCT_ADDITIONAL_IMAGES)).map(() => 'additional_image_link'),
  'link',
];

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
        const productId = generateItemId(item.title);

        const images = Array.from(new Array(MAX_PRODUCT_ADDITIONAL_IMAGES)).map((_, imageIndex) =>
          item.images[imageIndex]
            ? item.images[imageIndex].src.startsWith('http')
              ? item.images[imageIndex].src
              : `${SITE_DOMAIN}/item` + item.images[imageIndex].src
            : '',
        );

        productsData.push([
          productId,
          wrapInDoubleQuotes(item.title),
          wrapInDoubleQuotes(item.seo.description),
          item.price,
          item.availability ? 'in_stock' : 'out_of_stock',
          ...images,
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

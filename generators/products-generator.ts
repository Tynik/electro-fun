import { writeFileSync, appendFileSync } from 'fs';
import { getProductLink, readDb } from './helpers';
import { generateItemId, mergeDeep } from '../src/utils';
import { SITE_DOMAIN } from './constants';
import type { Db, ItemImage } from '../src/types';

const wrapInDoubleQuotes = (value: string) => `"${value}"`;

const getProductImageSrc = (itemImage: ItemImage) =>
  itemImage.src.startsWith('http') ? itemImage.src : SITE_DOMAIN + itemImage.src;

const PRODUCTS_FILENAME = 'products.txt';

const MAX_PRODUCT_ADDITIONAL_IMAGES = 10;

const COLUMNS = [
  'id',
  'title',
  'brand',
  'description',
  'price',
  'availability',
  'condition',
  'shipping_weight',
  'age_group',
  'image_link',
  'additional_image_link',
  'link',
];

type Products = (string | number)[][];

const run = () => {
  const productsData: Products = [];

  let db: Db | null = null;
  readDb(dbPart => {
    db = mergeDeep(db ?? {}, dbPart);
  });

  db.items.forEach(item => {
    if (!item.buy || typeof item.price !== 'number') {
      return;
    }

    if (!item.images.length) {
      console.warn(`Images are missing for product "${item.title}"`);
      return;
    }

    if (item.seo) {
      const productId = generateItemId(item.title);

      const additionalImages = item.images
        .slice(1, MAX_PRODUCT_ADDITIONAL_IMAGES)
        .map(getProductImageSrc);

      productsData.push([
        productId,
        wrapInDoubleQuotes(item.title),
        wrapInDoubleQuotes(db.brands[item.brandId]?.name ?? ''),
        wrapInDoubleQuotes(item.seo.description),
        item.price,
        item.availability ? 'in_stock' : 'out_of_stock',
        'new',
        `${item.weight ?? 0} g`,
        'adult',
        getProductImageSrc(item.images[0]),
        additionalImages.join(','),
        getProductLink(item),
      ]);
    }
  });

  writeFileSync(PRODUCTS_FILENAME, `${COLUMNS.join('\t')}\n`);

  productsData.forEach(product => {
    appendFileSync(PRODUCTS_FILENAME, `${product.join('\t')}\n`);
  });
};

run();

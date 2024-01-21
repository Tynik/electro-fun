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
  'gtin',
  'mpn',
  'identifier_exists',
  'description',
  'price',
  'availability',
  'quantity',
  'condition',
  'shipping_weight',
  'age_group',
  'image_link',
  'additional_image_link',
  'link',
];

type Products = (string | number | boolean)[][];

const run = () => {
  const productsData: Products = [];

  let db: Db | null = null;
  readDb(dbPart => {
    db = mergeDeep(db ?? {}, dbPart);
  });

  db.items.forEach(item => {
    if (!item.buy) {
      return;
    }

    if (typeof item.price !== 'number') {
      console.warn(`The price is not a number for product "${item.title}"`);
      return;
    }

    if (typeof item.availability !== 'number') {
      console.warn(`The availability is not a number for product "${item.title}"`);
      return;
    }

    if (!item.images.length) {
      console.warn(`Images are missing for product "${item.title}"`);
      return;
    }

    if (!item.seo) {
      console.warn(`SEO is missing for product "${item.title}"`);
      return;
    }

    if (!item.price) {
      console.warn(`The price is "0" for product "${item.title}"`);
      return;
    }

    const productId = generateItemId(item);

    const brand = wrapInDoubleQuotes(
      db.manufacturers[item.manufacturerId]?.name ?? db.brands[item.brandId]?.name ?? '',
    );

    const availability = item.availability ? 'in_stock' : 'out_of_stock';

    const additionalImages = item.images
      .slice(1, MAX_PRODUCT_ADDITIONAL_IMAGES)
      .map(getProductImageSrc);

    productsData.push([
      productId,
      wrapInDoubleQuotes(item.title),
      brand,
      item.gtin,
      item.mpn,
      // identifier_exists
      Boolean(item.gtin || item.mpn),
      wrapInDoubleQuotes(item.seo.description),
      item.price,
      availability,
      // quantity
      item.availability,
      // condition
      'new',
      // weight
      `${item.weight ?? 0} g`,
      'adult',
      getProductImageSrc(item.images[0]),
      additionalImages.join(','),
      getProductLink(item),
    ]);
  });

  writeFileSync(PRODUCTS_FILENAME, `${COLUMNS.join('\t')}\n`);

  productsData.forEach(product => {
    appendFileSync(PRODUCTS_FILENAME, `${product.join('\t')}\n`);
  });
};

run();

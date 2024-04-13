import { writeFileSync, appendFileSync } from 'fs';
import { getProductLink, readDb } from './helpers';
import { generateProductId, mergeDeep } from '../src/utils';
import { SITE_DOMAIN } from './constants';
import type { Db, ProductImage } from '../src/types';

const wrapInDoubleQuotes = (value: string) => `"${value}"`;

const getProductImageSrc = (productImage: ProductImage) =>
  productImage.src.startsWith('http') ? productImage.src : SITE_DOMAIN + productImage.src;

const PRODUCTS_FILENAME = 'products.txt';

const MAX_PRODUCT_ADDITIONAL_IMAGES = 10;

const COLUMNS = [
  'id',
  'google_product_category',
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
  'store_code',
  'pickup_method',
  'pickup_sla',
  'local_shipping_label',
];

type Products = (string | number | boolean)[][];

const run = () => {
  const productsData: Products = [];

  let db: Db | null = null;
  readDb(dbPart => {
    db = mergeDeep(db ?? {}, dbPart);
  });

  db.items.forEach(product => {
    if (!product.buy) {
      return;
    }

    if (typeof product.price !== 'number') {
      console.warn(`The price is not a number for product "${product.title}"`);
      return;
    }

    if (typeof product.quantity !== 'number') {
      console.warn(`The availability is not a number for product "${product.title}"`);
      return;
    }

    if (!product.images.length) {
      console.warn(`Images are missing for product "${product.title}"`);
      return;
    }

    if (!product.seo) {
      console.warn(`SEO is missing for product "${product.title}"`);
      return;
    }

    if (!product.price) {
      console.warn(`The price is "0" for product "${product.title}"`);
      return;
    }

    const productId = generateProductId(product);

    const brand = wrapInDoubleQuotes(
      db.manufacturers[product.manufacturerId]?.name ?? db.brands[product.brandId]?.name ?? '',
    );

    const availability = 0 ? 'in_stock' : 'out_of_stock';

    const additionalImages = product.images
      .slice(1, MAX_PRODUCT_ADDITIONAL_IMAGES)
      .map(getProductImageSrc);

    productsData.push([
      productId,
      // google_product_category
      product.googleCategoryId,
      wrapInDoubleQuotes(product.title),
      brand,
      product.gtin,
      product.mpn,
      // identifier_exists
      Boolean(product.gtin || product.mpn),
      wrapInDoubleQuotes(product.seo.description),
      product.price,
      availability,
      // quantity
      0,
      // condition
      'new',
      // weight
      `${product.weight ?? 0} g`,
      'adult',
      getProductImageSrc(product.images[0]),
      additionalImages.join(','),
      getProductLink(product),
      // store_code
      'SSE01',
      // pickup_method
      'buy',
      // pickup_sla
      'same day',
      // local_shipping_label
      'same_day_delivery',
    ]);
  });

  writeFileSync(PRODUCTS_FILENAME, `${COLUMNS.join('\t')}\n`);

  productsData.forEach(product => {
    appendFileSync(PRODUCTS_FILENAME, `${product.join('\t')}\n`);
  });
};

run();

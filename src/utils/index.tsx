import type { Product, Db, ProductContributorSrc } from '~/types';

export * from './mui';
export * from './object';
export * from './text';
export * from './router';

export const generateProductId = (product: Product) =>
  product.title.replace(/[ ./]/g, '-').toLowerCase();

export const preprocessProducts = (products: Product[]) =>
  products.map(item => ({
    ...item,
    id: generateProductId(item),
  }));

export const preprocessDb = (db: Db) => ({
  ...db,
  items: preprocessProducts(db.items),
});

export const getProductContributorAvatarSrc = (contributorSrc: ProductContributorSrc): string => {
  if (contributorSrc.source === 'github') {
    return `https://avatars.githubusercontent.com/u/${contributorSrc.userId}?s=60&v=4`;
  }

  if (contributorSrc.source === 'youtube' || contributorSrc.source === 'oshwlab') {
    return contributorSrc.avatarSrc;
  }

  throw new Error('Contributor avatar src cannot be found');
};

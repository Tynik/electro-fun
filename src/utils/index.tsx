import React from 'react';

import { ItemT, DbT, ItemContributorSrcT, ItemContributorSrcSourceT } from '~/types';

export * from './mui';
export * from './object';
export * from './text';
export * from './router';

export const generateItemId = (itemTitle: string) =>
  itemTitle.replace(/[ ./]/g, '-').toLowerCase();

export const preprocessItems = (items: ItemT[]) =>
  items.map(item => (
    {
      ...item,
      id: generateItemId(item.title)
    }
  ));

export const preprocessDb = (db: DbT) => (
  {
    ...db,
    items: preprocessItems(db.items)
  }
);

export const getItemContributorAvatarSrc = (contributorSrc: ItemContributorSrcT): string => {
  if (contributorSrc.source === ItemContributorSrcSourceT.GITHUB) {
    return `https://avatars.githubusercontent.com/u/${contributorSrc.userId}?s=60&v=4`;
  }
  throw new Error('Contributor avatar src cannot be found');
};

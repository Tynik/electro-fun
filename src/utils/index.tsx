import React from 'react';

import { ItemT, DbT, ItemDriverSrcT, ItemDriverSrcSourceT } from '../types';

export * from './mui';
export * from './object';
export * from './text';
export * from './router';

export const generateItemId = (itemTitle: string) =>
  itemTitle.replace(/[ .]/g, '-').toLowerCase();

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

export const getItemDriverAvatarSrc = (itemDriverSrc: ItemDriverSrcT): string => {
  if (itemDriverSrc.source === ItemDriverSrcSourceT.GITHUB) {
    return `https://avatars.githubusercontent.com/u/${itemDriverSrc.userId}?s=60&v=4`;
  }
  throw new Error('Driver avatar src cannot be found');
};

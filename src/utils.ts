import { Item, Db } from './types';

export const generateItemId = (itemTitle: string) =>
  itemTitle.replaceAll(' ', '-').toLowerCase();

export const preprocessItems = (items: Item[]) =>
  items.map(item => ({
    ...item,
    id: generateItemId(item.title)
  }));

export const preprocessDb = (db: Db) => ({
  ...db,
  items: preprocessItems(db.items)
});

export const getItemById = (db: Db, id: Pick<Item, 'id'>) =>
  db.items.find(item => item.id === id);

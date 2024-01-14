import { readFileSync } from 'fs';
import type { Db, DbMeta, Item } from '../src/types';
import { SITE_DOMAIN } from './constants';
import { generateItemId } from '../src/utils';

export const readJsonFile = <T>(path: string) => JSON.parse(readFileSync(path, 'utf8')) as T;

export const readDb = (callback: (dbPart: Db) => void) => {
  const dbMeta = readJsonFile<DbMeta>('./src/db/db.meta.json');

  Array.from(new Array(dbMeta.parts)).forEach((_, part) => {
    const dbPart = readJsonFile<Db>(`./src/db/db.${part + 1}.json`);

    callback(dbPart);
  });
};

export const getProductLink = (item: Item) => `${SITE_DOMAIN}/item/` + generateItemId(item);

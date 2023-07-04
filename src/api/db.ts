import type { DbMeta, Db } from '~/types';

export const fetchDbMeta = async (): Promise<DbMeta> =>
  (await fetch(`/db/db.meta.json?t=${Date.now()}`)).json();

export const fetchDbPart = async (partNumber: number): Promise<Db> =>
  (await fetch(`/db/db.${partNumber}.json?t=${Date.now()}`)).json();

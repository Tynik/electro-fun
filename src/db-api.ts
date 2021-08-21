import { DbMeta, Db } from './types';

export const fetchDbMeta = async (): Promise<DbMeta> =>
  (
    await fetch('/db/db.meta.json')
  ).json();

export const fetchDbPart = async (partNumber: number): Promise<Db> =>
  (
    await fetch(`/db/db.${partNumber}.json`)
  ).json();

import type { DbMetaT, DbT } from '~/types';

export const fetchDbMeta = async (): Promise<DbMetaT> =>
  (
    await fetch(`/db/db.meta.json?t=${Date.now()}`)
  ).json();

export const fetchDbPart = async (partNumber: number): Promise<DbT> =>
  (
    await fetch(`/db/db.${partNumber}.json?t=${Date.now()}`)
  ).json();

import React from 'react';

import type { Db, DbMeta } from '~/types';

import { mergeDeep, preprocessDb } from '~/utils';
import { fetchDbMeta, fetchDbPart } from '~/api';

import { useStaticErrors } from './useStaticErrors';

export type DbPartIdT = string;
export type DbPartsT = Record<DbPartIdT, Db>;

export type UseDbOptions = {
  itemsPerPage: number;
};

export const useJsonDb = (options: UseDbOptions = { itemsPerPage: 50 }) => {
  const [dbMeta, setDbMeta] = React.useState<DbMeta>(null);
  const [fullDb, setFullDb] = React.useState<Db>(null);
  const [page, setPage] = React.useState<number>(1);
  const [dbPartNumber, setDbPartNumber] = React.useState<number>(1);
  const [dbParts, setDbParts] = React.useState<DbPartsT>({});

  const { errors, setErrors, printErrors } = useStaticErrors({ showReturnToMain: false });

  const endOffset = page * options.itemsPerPage;

  React.useEffect(() => {
    (async () => {
      await loadDbMeta();
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (!dbMeta) {
        return;
      }
      if (dbParts[dbPartNumber]) {
        // cache db part mechanism
        return;
      }
      await loadDbPart(dbPartNumber);
    })();
  }, [dbMeta, dbPartNumber]);

  React.useEffect(() => {
    if (!Object.keys(dbParts).length) {
      return;
    }
    setFullDb(mergeDeep({}, ...Object.values(dbParts)));
  }, [dbParts]);

  const db = React.useMemo(() => {
    if (!fullDb) {
      return;
    }
    return {
      ...fullDb,
      items: fullDb.items.slice(0, endOffset),
    };
  }, [fullDb, endOffset]);

  const loadDbMeta = React.useCallback(async () => {
    try {
      setDbMeta(await fetchDbMeta());
    } catch (e) {
      setErrors(['Error loading meta db']);
      throw e;
    }
  }, []);

  const loadDbPart = React.useCallback(async (partNumber: number) => {
    try {
      const dbPart = await fetchDbPart(partNumber);

      setDbParts(dbParts => ({ ...dbParts, [partNumber]: preprocessDb(dbPart) }));
    } catch (e) {
      setErrors(['Error loading db']);
      throw e;
    }
  }, []);

  const loadPreviousDbPart = React.useCallback((): boolean => {
    if (dbPartNumber > 1) {
      setDbPartNumber(dbPartNumber - 1);
      return true;
    }
    return false;
  }, [dbPartNumber]);

  const isNextDbPart = React.useCallback((): boolean => {
    if (!dbMeta) {
      return;
    }
    return dbPartNumber < dbMeta.parts;
  }, [dbMeta, dbPartNumber]);

  const loadNextDbPart = React.useCallback((): boolean => {
    if (isNextDbPart()) {
      setDbPartNumber(dbPartNumber + 1);
      return true;
    }
    return false;
  }, [isNextDbPart, dbPartNumber]);

  const isNextPage = React.useCallback((): boolean => {
    if (!db) {
      return;
    }
    return endOffset < db.items.length || isNextDbPart();
  }, [db, isNextDbPart, endOffset]);

  const loadNextPage = React.useCallback(() => {
    if (endOffset >= fullDb.items.length && isNextDbPart()) {
      loadNextDbPart();
    }
    setPage(page => ++page);
  }, [fullDb, isNextDbPart, endOffset, loadNextDbPart]);

  return {
    db,
    loadDbPart: setDbPartNumber,
    loadPreviousDbPart,
    isNextDbPart,
    loadNextDbPart,
    isNextPage,
    loadNextPage,
    errors,
    printErrors,
  };
};

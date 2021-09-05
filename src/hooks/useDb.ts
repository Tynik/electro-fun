import React from 'react';
import { Db, DbMeta } from '../types';
import { mergeDeep, preprocessDb } from '../utils';
import { fetchDbMeta, fetchDbPart } from '../db-api';
import { useStaticErrors } from './useStaticErrors';

export type useDbOptions = {
  partNumber: number
}

export const useDb = (options: useDbOptions = { partNumber: 1 }) => {
  const [dbMeta, setDbMeta] = React.useState<DbMeta>(null);
  const [db, setDb] = React.useState<Db>(null);
  const [dbPartNumber, setDbPartNumber] = React.useState<number>(options.partNumber);
  const [dbParts, setDbParts] = React.useState<Record<string, Db>>({});

  const { errors, setErrors, printErrors } = useStaticErrors({ showReturnToMain: false });

  React.useEffect(() => {
    (
      async () => {
        await loadDbMeta();
      }
    )();
  }, []);

  React.useEffect(() => {
    (
      async () => {
        if (!dbMeta) {
          return;
        }
        if (dbParts[dbPartNumber]) {
          // cache db part mechanism
          return;
        }
        await loadDbPart(dbPartNumber);
      }
    )();
  }, [dbMeta, dbPartNumber]);

  React.useEffect(() => {
    if (!Object.keys(dbParts).length) {
      return;
    }
    setDb(mergeDeep({}, ...Object.values(dbParts)));

  }, [dbParts]);

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

      setDbParts(dbParts => (
        { ...dbParts, [partNumber]: preprocessDb(dbPart) }
      ));
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

  return {
    db,
    loadDbPart: setDbPartNumber,
    loadPreviousDbPart,
    isNextDbPart,
    loadNextDbPart,
    errors,
    printErrors
  };
};

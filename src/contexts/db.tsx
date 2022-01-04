import React from 'react';

import type { DbT } from '~/types';

import { useJsonDb } from '~/hooks';

export type DbContextState = {
  db: DbT
  isNextDbPart: () => boolean
  loadNextDbPart: () => boolean
  isNextPage: () => boolean
  loadNextPage: () => void
}

const initialDbContextState: DbContextState = {
  db: null,
  isNextDbPart: null,
  loadNextDbPart: null,
  isNextPage: null,
  loadNextPage: null
}

export const DbContext = React.createContext(initialDbContextState);

export const DbContextProvider = ({ children }) => {
  const {
    db,
    errors,
    printErrors,
    isNextDbPart,
    loadNextDbPart,
    isNextPage,
    loadNextPage
  } = useJsonDb();

  if (errors.length) {
    return printErrors();
  }

  return (
    <DbContext.Provider value={{
      db,
      isNextDbPart,
      loadNextDbPart,
      isNextPage,
      loadNextPage
    }}>
      {children}
    </DbContext.Provider>
  )
}

import React from 'react';

import type { DbT } from '../types';

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

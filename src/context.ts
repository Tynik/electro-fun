import React from 'react';

import { Db } from './types';

export type DbContextState = {
  db: Db
  isNextDbPart: () => boolean
  loadNextDbPart: () => boolean
}

const initialDbContextState: DbContextState = {
  db: null,
  isNextDbPart: null,
  loadNextDbPart: null,
}

export const DbContext = React.createContext(initialDbContextState);

import React from 'react';

import { Db } from './types';

export type AppContextState = {
  db: Db
}

const initialAppContextState: AppContextState = {
  db: null
}

export const AppContext = React.createContext(initialAppContextState);

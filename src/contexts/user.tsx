import React from 'react';

import type { UserT } from '../types';

export type UserContextState = {
  user: UserT
}

const initialUserContextState: UserContextState = {
  user: {
    basket: {
      items: []
    }
  },
}

export const UserContext = React.createContext(initialUserContextState);

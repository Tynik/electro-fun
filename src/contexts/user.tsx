import React from 'react';

import type { UserT, ItemIdT } from '../types';

import { useUser } from '../hooks';

export type UserContextState = {
  user: UserT
  buyItem: (itemId: ItemIdT) => void
  removeItemFromBasket: (itemId: ItemIdT, all?: boolean) => void
  clearBasket: () => void
}

const initialUserContextState: UserContextState = {
  user: null,
  buyItem: null,
  removeItemFromBasket: null,
  clearBasket: null,
}

export const UserContext = React.createContext(initialUserContextState);

export const UserContextProvider = ({ children }) => {
  const user = useUser();

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

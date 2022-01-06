import React from 'react';

import type { UserT, ItemT, ItemIdT, ItemOptionIdT } from '~/types';

import { useUser } from '~/hooks';

export type UserContextState = {
  user: UserT
  numberAllItemsInBasket: number
  getNumberItemsInBasket: (item: ItemT, optionId: ItemOptionIdT) => number
  addItemToBasket: (itemId: ItemIdT, optionId: ItemOptionIdT) => void
  removeItemFromBasket: (itemId: ItemIdT, optionId: ItemOptionIdT, all?: boolean) => void
  clearBasket: () => void
}

const initialUserContextState: UserContextState = {
  user: null,
  numberAllItemsInBasket: null,
  getNumberItemsInBasket: null,
  addItemToBasket: null,
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

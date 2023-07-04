import React from 'react';

import type { UserT, Item, ItemId, ItemOptionId } from '~/types';

import { useUser } from '~/hooks';

export type UserContextState = {
  user: UserT;
  numberAllItemsInBasket: number;
  getNumberItemsInBasket: (item: Item, optionId: ItemOptionId) => number;
  addItemToBasket: (itemId: ItemId, optionId: ItemOptionId) => void;
  removeItemFromBasket: (itemId: ItemId, optionId: ItemOptionId, all?: boolean) => void;
  clearBasket: () => void;
};

const initialUserContextState: UserContextState = {
  user: null,
  numberAllItemsInBasket: null,
  getNumberItemsInBasket: null,
  addItemToBasket: null,
  removeItemFromBasket: null,
  clearBasket: null,
};

export const UserContext = React.createContext(initialUserContextState);

export const UserContextProvider = ({ children }) => {
  const user = useUser();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

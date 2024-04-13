import React from 'react';
import type { PropsWithChildren } from 'react';

import type { UserInfo, Product, ProductId, ProductOptionId, Nullable } from '~/types';

import { useUser } from '~/hooks';

export type UserContextValue = {
  user: UserInfo;
  totalNumberProductsInBasket: number;
  getNumberProductsInBasket: (item: Product, optionId: Nullable<ProductOptionId>) => number;
  addProductToBasket: (itemId: ProductId, optionId: Nullable<ProductOptionId>) => void;
  removeProductFromBasket: (
    itemId: ProductId,
    optionId: Nullable<ProductOptionId>,
    all?: boolean,
  ) => void;
  clearBasket: () => void;
};

const initialUserContextState: UserContextValue = {
  user: null,
  totalNumberProductsInBasket: null,
  getNumberProductsInBasket: null,
  addProductToBasket: null,
  removeProductFromBasket: null,
  clearBasket: null,
};

export const UserContext = React.createContext<UserContextValue>(initialUserContextState);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const user = useUser();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

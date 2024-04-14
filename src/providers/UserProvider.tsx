import React, { useMemo } from 'react';
import type { PropsWithChildren } from 'react';

import type { UserInfo, ProductId, ProductOptionId, Nullable, UserBasket } from '~/types';

import { useLocalStorage } from '~/hooks';
import { DEFAULT_PRODUCT_OPTION_ID } from '~/constants';

type GetNumberProductsInBasket = (
  productId: ProductId,
  optionId: Nullable<ProductOptionId>,
) => number;

type AddProductToBasket = (productId: ProductId, optionId: Nullable<ProductOptionId>) => void;

type RemoveProductFromBasket = (
  productId: ProductId,
  optionId: Nullable<ProductOptionId>,
  all?: boolean,
) => void;

type ClearBasket = () => void;

export type UserContextValue = {
  user: UserInfo;
  totalNumberProductsInBasket: number;
  getNumberProductsInBasket: GetNumberProductsInBasket;
  addProductToBasket: AddProductToBasket;
  removeProductFromBasket: RemoveProductFromBasket;
  clearBasket: ClearBasket;
};

const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { set: saveBasketState, initialValue: basketInitialValue } = useLocalStorage<UserBasket>(
    'basket',
    {
      products: {},
    },
  );

  const [user, setUser] = React.useState<UserInfo>(() => ({
    basket: { ...basketInitialValue },
  }));

  React.useEffect(() => {
    saveBasketState(user.basket);
  }, [user]);

  const addProductToBasket = React.useCallback<AddProductToBasket>((productId, optionId) => {
    setUser(user => {
      const productOptionId = optionId ?? DEFAULT_PRODUCT_OPTION_ID;

      const productOptions = user.basket.products[productId] || {};

      return {
        ...user,
        basket: {
          products: {
            ...user.basket.products,
            [productId]: {
              ...productOptions,
              [productOptionId]: ++productOptions[productOptionId] || 1,
            },
          },
        },
      };
    });
  }, []);

  const removeProductFromBasket = React.useCallback<RemoveProductFromBasket>(
    (productId, optionId, all = false) => {
      setUser(user => {
        const productOptionId = optionId ?? DEFAULT_PRODUCT_OPTION_ID;

        const products = { ...user.basket.products };

        if (all) {
          delete products[productId][productOptionId];

          if (!Object.keys(products[productId]).length) {
            // Delete product itself if all options are removed
            delete products[productId];
          }
        } else {
          products[productId][productOptionId] -= 1;

          if (!products[productId][productOptionId]) {
            delete products[productId];
          }
        }

        return {
          ...user,
          basket: {
            ...user.basket,
            products,
          },
        };
      });
    },
    [],
  );

  const clearBasket = React.useCallback<ClearBasket>(() => {
    setUser(user => ({
      ...user,
      basket: {
        ...user.basket,
        products: {},
      },
    }));
  }, []);

  const getNumberProductsInBasket = React.useCallback<GetNumberProductsInBasket>(
    (productId, optionId) =>
      (user.basket.products[productId] || {})[optionId ?? DEFAULT_PRODUCT_OPTION_ID] || 0,
    [user.basket.products],
  );

  const totalNumberProductsInBasket = Object.keys(user.basket.products).length;

  const contextValue = useMemo<UserContextValue>(
    () => ({
      user,
      totalNumberProductsInBasket,
      addProductToBasket,
      removeProductFromBasket,
      clearBasket,
      getNumberProductsInBasket,
    }),
    [user],
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useCurrentUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useCurrentUser must be used within useContext');
  }

  return context;
};

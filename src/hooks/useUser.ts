import React from 'react';

import type { Product, ProductId, ProductOptionId, UserBasket, UserInfo } from '~/types';

import { useLocalStorage } from './useLocalStorage';

export const useUser = () => {
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

  const addProductToBasket = React.useCallback((itemId: ProductId, optionId: ProductOptionId) => {
    setUser(user => {
      const productOptions = user.basket.products[itemId] || {};

      return {
        ...user,
        basket: {
          products: {
            ...user.basket.products,
            [itemId]: {
              ...productOptions,
              [optionId]: ++productOptions[optionId] || 1,
            },
          },
        },
      };
    });
  }, []);

  const removeProductFromBasket = React.useCallback(
    (productId: ProductId, optionId: ProductOptionId, all = false) => {
      setUser(user => {
        const products = { ...user.basket.products };

        if (all) {
          delete products[productId][optionId];

          if (!Object.keys(products[productId]).length) {
            // Delete product itself if all options are removed
            delete products[productId];
          }
        } else {
          products[productId][optionId] -= 1;

          if (!products[productId][optionId]) {
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

  const clearBasket = React.useCallback(() => {
    setUser(user => ({
      ...user,
      basket: {
        ...user.basket,
        products: {},
      },
    }));
  }, []);

  const getNumberProductsInBasket = React.useCallback(
    (item: Product, itemOptionId: ProductOptionId) =>
      (user.basket.products[item.id] || {})[itemOptionId] || 0,
    [user.basket.products],
  );

  const totalNumberProductsInBasket = Object.keys(user.basket.products).length;

  return {
    user,
    addProductToBasket,
    removeProductFromBasket,
    clearBasket,
    getNumberProductsInBasket,
    totalNumberProductsInBasket,
  };
};

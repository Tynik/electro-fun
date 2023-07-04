import React from 'react';

import type { Item, ItemId, ItemOptionId, UserBasket, UserT } from '~/types';

import { useLocalStorage } from './useLocalStorage';

export const useUser = () => {
  const { set: saveBasketState, initialValue: basketInitialValue } = useLocalStorage<UserBasket>(
    'basket',
    {
      items: {},
    }
  );

  const [user, setUser] = React.useState<UserT>({
    basket: { ...basketInitialValue },
  });

  React.useEffect(() => {
    saveBasketState(user.basket);
  }, [user]);

  const addItemToBasket = React.useCallback((itemId: ItemId, optionId: ItemOptionId) => {
    setUser(user => {
      const itemOptions = user.basket.items[itemId] || {};

      return {
        ...user,
        basket: {
          items: {
            ...user.basket.items,
            [itemId]: {
              ...itemOptions,
              [optionId]: ++itemOptions[optionId] || 1,
            },
          },
        },
      };
    });
  }, []);

  const removeItemFromBasket = React.useCallback(
    (itemId: ItemId, optionId: ItemOptionId, all: boolean = false) => {
      setUser(user => {
        let items = { ...user.basket.items };

        if (all) {
          delete items[itemId][optionId];
        } else {
          items[itemId][optionId]--;
        }
        return {
          ...user,
          basket: {
            ...user.basket,
            items,
          },
        };
      });
    },
    []
  );

  const clearBasket = React.useCallback(() => {
    setUser(user => ({
      ...user,
      basket: {
        ...user.basket,
        items: {},
      },
    }));
  }, []);

  const getNumberItemsInBasket = React.useCallback(
    (item: Item, itemOptionId: ItemOptionId) =>
      (user.basket.items[item.id] || {})[itemOptionId] || 0,
    [user.basket.items]
  );

  const numberAllItemsInBasket = React.useMemo(
    () => Object.keys(user.basket.items).length,
    [user.basket.items]
  );

  return {
    user,
    addItemToBasket,
    removeItemFromBasket,
    clearBasket,
    getNumberItemsInBasket,
    numberAllItemsInBasket,
  };
};

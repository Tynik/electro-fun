import React from 'react';

import type { ItemIdT, ItemOptionIdT, UserBasketT, UserT } from '../types';

import { useLocalStorage } from './useLocalStorage';

export const useUser = () => {
  const {
    set: saveBasketState,
    initialValue: basketInitialValue
  } = useLocalStorage<UserBasketT>('basket', {
    items: {}
  });

  const [user, setUser] = React.useState<UserT>({
    basket: { ...basketInitialValue }
  });

  React.useEffect(() => {
    saveBasketState(user.basket);
  }, [user]);

  const addItemToBasket = React.useCallback(
    (itemId: ItemIdT, optionId: ItemOptionIdT) => {
      setUser(user => {
        const itemOptions = user.basket.items[itemId] || {};

        return {
          ...user,
          basket: {
            items: {
              ...user.basket.items,
              [itemId]: {
                ...itemOptions,
                [optionId]: ++itemOptions[optionId] || 1
              }
            }
          }
        };
      });
    }, []);

  const removeItemFromBasket = React.useCallback(
    (
      itemId: ItemIdT,
      optionId: ItemOptionIdT,
      all: boolean = false
    ) => {
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
            items
          }
        };
      });
    }, []);

  const clearBasket = React.useCallback(() => {
    setUser(user => ({
      ...user,
      basket: {
        ...user.basket,
        items: {}
      }
    }));
  }, []);

  const countItemsInBasket = React.useMemo(() =>
      Object.keys(user.basket.items).length,
    [user.basket.items]
  );

  return {
    user,
    addItemToBasket,
    removeItemFromBasket,
    clearBasket,
    countItemsInBasket
  };
};

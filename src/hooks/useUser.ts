import React from 'react';

import type { ItemIdT, UserBasketT, UserT } from '../types';

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

  const buyItem = React.useCallback((itemId: ItemIdT) => {
    setUser(user => ({
      ...user,
      basket: {
        items: {
          ...user.basket.items,
          [itemId]: ++user.basket.items[itemId] || 1
        }
      }
    }));
  }, []);

  const removeItemFromBasket = React.useCallback(
    (
      itemId: ItemIdT,
      all: boolean = false
    ) => {
      setUser(user => {
        let items = { ...user.basket.items };

        if (all) {
          delete items[itemId];
        } else {
          items[itemId]--;
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
    []
  );

  return {
    user,
    buyItem,
    removeItemFromBasket,
    clearBasket,
    countItemsInBasket
  };
};

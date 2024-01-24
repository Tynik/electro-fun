import type { ItemId, ItemOptionId } from './ids.types';

export type UserBasketItem = Record<ItemOptionId, number>;

export type UserBasket = {
  items: Record<ItemId, UserBasketItem>;
};

export type UserInfo = {
  basket: UserBasket;
};

import type { ItemId, ItemOptionId } from './ids.types';

export type UserBasketItemT = Record<ItemOptionId, number>;

export type UserBasket = {
  items: Record<ItemId, UserBasketItemT>;
};

export type UserT = {
  basket: UserBasket;
};

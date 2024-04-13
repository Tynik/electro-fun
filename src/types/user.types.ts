import type { ProductId, ProductOptionId } from './ids.types';

export type UserBasketProduct = Record<ProductOptionId, number>;

export type UserBasket = {
  products: Record<ProductId, UserBasketProduct>;
};

export type UserInfo = {
  basket: UserBasket;
};

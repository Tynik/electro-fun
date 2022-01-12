import { ItemIdT, ItemOptionIdT } from './ids';

export type UserBasketItemT = Record<ItemOptionIdT, number>

export type UserBasketT = {
  items: Record<ItemIdT, UserBasketItemT>
}

export type UserT = {
  basket: UserBasketT
}

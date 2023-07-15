import { netlifyRequest } from '~/api/api-client';

export type CheckoutResponse = {
  url: string;
};

export type CheckoutItem = {
  weight: number;
  priceId: string;
  quantity: number;
};

export type CheckoutPayload = {
  fullName: string;
  phone: string;
  email: string;
  shippingCity: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingPostcode: string;
  note: string;
  items: CheckoutItem[];
};

export const checkoutRequest = async (payload: CheckoutPayload) =>
  (await netlifyRequest<CheckoutResponse>('checkout', { payload, method: 'POST' })).data;

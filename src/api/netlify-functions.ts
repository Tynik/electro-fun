import { netlifyRequest } from '~/api/api-client';

import type { StripePriceId, StripeProductId, StripeSessionId } from '~/types';

export type StripeProductPrice = {
  amount: number;
  quantity: number;
};

export type StripeProduct = {
  id: StripeProductId;
  prices: Record<StripePriceId, StripeProductPrice>;
};

export const getStripeProducts = async (productIds: StripeProductId[]) =>
  (
    await netlifyRequest<StripeProduct[]>('get-products', {
      method: 'GET',
      params: {
        ids: productIds.join(','),
      },
    })
  ).data;

export const getStripeProduct = async (productId: StripeProductId) =>
  (
    await netlifyRequest<StripeProduct>('get-product', {
      method: 'GET',
      params: {
        productId,
      },
    })
  ).data;

export type CheckoutResponse = {
  url: string;
};

export type CheckoutProductPayload = {
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
  products: CheckoutProductPayload[];
};

export const checkoutRequest = async (payload: CheckoutPayload) =>
  (await netlifyRequest<CheckoutResponse>('checkout', { payload, method: 'POST' })).data;

type Customer = {
  name: string;
  email: string;
  phone: string | null;
  address: unknown;
};

type OrderConfirmationResult = {
  customer?: Customer;
  error?: string;
};

export const confirmOrder = async (sessionId: StripeSessionId) =>
  (
    await netlifyRequest<OrderConfirmationResult>('confirm-order', {
      method: 'POST',
      params: { sessionId },
    })
  ).data;

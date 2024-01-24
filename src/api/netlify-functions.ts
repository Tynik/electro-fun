import { netlifyRequest } from '~/api/api-client';
import type { StripeProductId, StripeSessionId } from '~/types';

export type StripeProduct = {
  quantity: number;
};

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

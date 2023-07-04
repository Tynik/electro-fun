import { netlifyRequest } from '~/api/api-client';

export type CheckoutResponse = {
  status: string;
  data: {
    url: string;
  };
};

type Item = {
  priceId: string;
  quantity: 1;
};

export type CheckoutPayload = {
  fullName: string;
  phone: string;
  deliveryAddress: string;
  note: string;
  items: Item[];
};

export const checkoutRequest = async (payload: CheckoutPayload) =>
  (await netlifyRequest<CheckoutResponse>('checkout', { payload, method: 'POST' })).data;

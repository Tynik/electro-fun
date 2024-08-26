import Stripe from 'stripe';

import { SITE_DOMAIN } from '../constants';
import {
  createHandler,
  findStripeCustomer,
  getStripeAllowableShippingRates,
  initStripeClient,
} from '../helpers';

const ORDER_CONFIRMATION_PAGE_URL = `${SITE_DOMAIN}/order-confirmation?sessionId={CHECKOUT_SESSION_ID}`;

type ProductPayload = {
  priceId: Stripe.Price['id'];
  weight: number;
  quantity: number;
};

type CheckoutPayload = {
  fullName: string;
  phone: string;
  email: string;
  shippingCity: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingPostcode: string;
  note: string;
  products: ProductPayload[];
};

export const handler = createHandler<CheckoutPayload>(
  { allowMethods: ['POST'] },
  async ({ payload }) => {
    if (!payload) {
      return {
        status: 'error',
        data: {
          error: 'Payload is empty',
        },
      };
    }

    const stripe = initStripeClient();

    const totalProductsWeight = payload.products.reduce(
      (totalWeight, product) => totalWeight + product.weight,
      0,
    );

    const shippingRates = await getStripeAllowableShippingRates(stripe, {
      minimumWeightThreshold: totalProductsWeight,
    });

    const paymentIntentData: Stripe.Checkout.SessionCreateParams.PaymentIntentData = {
      receipt_email: payload.email,
      description: payload.note,
      shipping: {
        name: payload.fullName,
        phone: payload.phone,
        address: {
          country: 'GB',
          city: payload.shippingCity,
          line1: payload.shippingAddress1,
          line2: payload.shippingAddress2,
          postal_code: payload.shippingPostcode,
        },
      },
    };

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = payload.products.map(
      product => ({
        price: product.priceId,
        quantity: product.quantity,
      }),
    );

    const existCustomer = await findStripeCustomer(stripe, payload.email);

    const session = await stripe.checkout.sessions.create({
      payment_intent_data: paymentIntentData,
      line_items: lineItems,
      shipping_options: shippingRates.map(shippingRate => ({
        shipping_rate: shippingRate.id,
      })),
      success_url: ORDER_CONFIRMATION_PAGE_URL,
      cancel_url: ORDER_CONFIRMATION_PAGE_URL,
      mode: 'payment',
      currency: 'GBP',
      ...(existCustomer
        ? {
            customer: existCustomer.id,
          }
        : {
            customer_email: payload.email,
            customer_creation: 'always',
          }),
    });

    return {
      status: 'ok',
      data: {
        url: session.url,
      },
    };
  },
);

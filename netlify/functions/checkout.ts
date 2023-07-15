import { createHandler, getStripeShippingRatesList, initStripeClient } from '../netlify.helpers';

type Item = {
  priceId: string;
  weight: number;
  quantity: number;
};

type Payload = {
  fullName: string;
  email: string;
  shippingCity: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingPostcode: string;
  note: string;
  items: Item[];
};

const SITE_DOMAIN = process.env.SITE_DOMAIN ?? 'http://localhost:8097';

export const handler = createHandler<Payload>({ allowMethods: ['POST'] }, async ({ payload }) => {
  const stripe = initStripeClient();

  const totalItemsWeight = payload.items.reduce(
    (totalWeight, item) => totalWeight + item.weight,
    0
  );

  const shippingRates = await getStripeShippingRatesList(stripe, {
    minimumWeightThreshold: totalItemsWeight,
  });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_intent_data: {
      receipt_email: payload.email,
      description: payload.note,
      shipping: {
        name: payload.fullName,
        address: {
          country: 'GB',
          city: payload.shippingCity,
          line1: payload.shippingAddress1,
          line2: payload.shippingAddress2,
          postal_code: payload.shippingPostcode,
        },
      },
    },
    customer_creation: 'always',
    customer_email: payload.email,
    shipping_address_collection: {
      allowed_countries: ['GB'],
    },
    shipping_options: shippingRates.map(shippingRate => ({
      shipping_rate: shippingRate.id,
    })),
    line_items: payload.items.map(item => ({
      price: item.priceId,
      quantity: item.quantity,
    })),
    success_url: `${SITE_DOMAIN}?success=true`,
    cancel_url: `${SITE_DOMAIN}?canceled=true`,
  });

  return {
    status: 'ok',
    data: {
      url: session.url,
    },
  };
});

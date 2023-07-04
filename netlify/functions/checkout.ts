import { createHandler } from '../netlify.helpers';

import Stripe from 'stripe';

const stripe = new Stripe(
  process.env.STRIPE_API_KEY ??
    'sk_test_51NDw9MARhMwSarZX5RFCidCIKsrec9HdO3gMDT3zBc1COtGyVrV5x93jKzXPDqUveYdWt9lcHm1YiVWxgQarpt1j006wO8q0eR',
  {}
);

const SITE_DOMAIN = process.env.SITE_DOMAIN ?? 'http://localhost:8097';

type Item = {
  priceId: string;
  weight: number;
  quantity: number;
};

type Payload = {
  items: Item[];
};

type ShippingRatesListOptions = {
  minimumWeightThreshold: number;
};

const getShippingRatesList = async ({ minimumWeightThreshold }: ShippingRatesListOptions) => {
  const { data: shippingRates } = await stripe.shippingRates.list({
    active: true,
    limit: 100,
  });

  return shippingRates.filter(
    shippingRate => +shippingRate.metadata.maxWeight >= minimumWeightThreshold
  );
};

const getProductsList = async () => {
  const { data: products } = await stripe.products.list({
    active: true,
    limit: 100,
  });

  return products;
};

export const handler = createHandler<Payload>(
  { allowMethods: ['POST'] },
  async ({ payload: { items } }) => {
    const totalItemsWeight = items.reduce((totalWeight, item) => totalWeight + item.weight, 0);

    const shippingRates = await getShippingRatesList({
      minimumWeightThreshold: totalItemsWeight,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: items.map(item => ({
        price: item.priceId,
        quantity: item.quantity,
      })),
      mode: 'payment',
      shipping_options: shippingRates.map(shippingRate => ({
        shipping_rate: shippingRate.id,
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
  }
);

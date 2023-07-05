import { createHandler, getStripeShippingRatesList, initStripeClient } from '../netlify.helpers';

type Item = {
  priceId: string;
  weight: number;
  quantity: number;
};

type Payload = {
  items: Item[];
};

const SITE_DOMAIN = process.env.SITE_DOMAIN ?? 'http://localhost:8097';

export const handler = createHandler<Payload>(
  { allowMethods: ['POST'] },
  async ({ payload: { items } }) => {
    const stripe = initStripeClient();

    const totalItemsWeight = items.reduce((totalWeight, item) => totalWeight + item.weight, 0);

    const shippingRates = await getStripeShippingRatesList(stripe, {
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

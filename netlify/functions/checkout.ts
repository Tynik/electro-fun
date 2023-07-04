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
  quantity: number;
};

type Payload = {
  items: Item[];
};

export const handler = createHandler<Payload>({ allowMethods: ['POST'] }, async ({ payload }) => {
  const session = await stripe.checkout.sessions.create({
    line_items: payload.items.map(item => ({
      price: item.priceId,
      quantity: item.quantity,
    })),
    mode: 'payment',
    shipping_options: [
      {
        shipping_rate: 'shr_1NQ8dDARhMwSarZXn5GIt4kx',
      },
      {
        shipping_rate: 'shr_1NQ8flARhMwSarZXBBTINVJt',
      },
    ],
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

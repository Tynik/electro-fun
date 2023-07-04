import { createHandler } from '../netlify.helpers';

import Stripe from 'stripe';

const stripe = new Stripe(
  process.env.STRIPE_API_KEY ??
    'pk_test_51NDw9MARhMwSarZXoUzqXkP8893DqdhtZafZNBkjEHz2lWW3nZDHbvBHQ2VkSAFXGAIz1fjnCwVa72SC1J1sb8a600DX0JfptS',
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

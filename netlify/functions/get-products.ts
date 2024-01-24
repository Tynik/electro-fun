import { createHandler, initStripeClient } from '../helpers';

export const handler = createHandler({ allowMethods: ['GET'] }, async ({ event }) => {
  const productIds = event.queryStringParameters.ids.split(',');

  const stripe = initStripeClient();

  const products = await stripe.products.list({
    ids: productIds,
    limit: 100,
  });

  return {
    status: 'ok',
    data: products.data.map(product => ({
      id: product.id,
      quantity: +product.metadata.quantity,
    })),
  };
});

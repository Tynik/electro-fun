import { createHandler, initStripeClient } from '../helpers';

export const handler = createHandler({ allowMethods: ['GET'] }, async ({ event }) => {
  const productId = event.queryStringParameters.productId;

  const stripe = initStripeClient();

  const product = await stripe.products.retrieve(productId);

  return {
    status: 'ok',
    data: product.metadata,
  };
});

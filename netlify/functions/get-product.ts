import { createHandler, initStripeClient, processProductPrices } from '../helpers';

export const handler = createHandler({ allowMethods: ['GET'] }, async ({ event }) => {
  const productId = event.queryStringParameters?.productId;

  const stripe = initStripeClient();

  const prices = await stripe.prices.list({
    product: productId,
    active: true,
  });

  return {
    status: 'ok',
    data: {
      prices: processProductPrices(prices.data),
    },
  };
});

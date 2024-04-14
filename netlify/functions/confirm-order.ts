import { createHandler, initStripeClient } from '../helpers';

export const handler = createHandler({ allowMethods: ['POST'] }, async ({ event }) => {
  const sessionId = event.queryStringParameters?.sessionId;
  if (!sessionId) {
    return {
      status: 'error',
      data: {
        error: 'Session ID is missed',
      },
    };
  }

  const stripe = initStripeClient();

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const paymentId =
    typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id;

  if (!paymentId) {
    return {
      status: 'error',
      data: {
        error: 'Payment ID is empty',
      },
    };
  }

  const payment = await stripe.paymentIntents.retrieve(paymentId);
  if (payment.status !== 'processing' && payment.status !== 'succeeded') {
    return {
      status: 'error',
      data: {
        error: 'Payment was not success',
      },
    };
  }

  if (payment.metadata.completed !== 'yes') {
    const itemLines = await stripe.checkout.sessions.listLineItems(sessionId, {
      limit: 100,
    });

    const updatePricesMetadataTasks = itemLines.data.map(async itemLine => {
      if (!itemLine.price) {
        throw new Error('Price is missed');
      }

      const currentPriceQuantity = +itemLine.price.metadata.quantity;

      if (currentPriceQuantity > 0) {
        const remainingPriceQuantity = currentPriceQuantity - (itemLine.quantity ?? 0);

        await stripe.prices.update(itemLine.price.id, {
          metadata: {
            quantity: remainingPriceQuantity > 0 ? remainingPriceQuantity : 0,
          },
        });
      }
    });

    await Promise.all(updatePricesMetadataTasks ?? []);

    await stripe.paymentIntents.update(paymentId, {
      metadata: {
        completed: 'yes',
      },
    });
  }

  return {
    status: 'ok',
    data: {
      customer: session.customer_details,
    },
  };
});

import { createHandler, initStripeClient } from '../helpers';

export const handler = createHandler({ allowMethods: ['POST'] }, async ({ event }) => {
  const sessionId = event.queryStringParameters.sessionId;

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
        error: 'Payment ID is missed',
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

    const updateProductsMetadataTasks = itemLines.data.map(async itemLine => {
      if (!itemLine.price) {
        throw new Error('Price is missed');
      }

      const productId =
        typeof itemLine.price.product === 'string'
          ? itemLine.price.product
          : itemLine.price.product.id;

      if (!productId) {
        throw Error('Product ID was not identified');
      }

      const product = await stripe.products.retrieve(productId);
      const currentProductQuantity = +product.metadata.quantity;

      if (currentProductQuantity > 0) {
        const remainingProductQuantity = currentProductQuantity - itemLine.quantity;

        await stripe.products.update(productId, {
          metadata: {
            quantity: remainingProductQuantity > 0 ? remainingProductQuantity : 0,
          },
        });
      }
    });

    await Promise.all(updateProductsMetadataTasks ?? []);

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

import Stripe from 'stripe';
import type { Handler, HandlerResponse, HandlerEvent, HandlerContext } from '@netlify/functions';

import { STRIPE_API_KEY } from './constants';

type HTTPMethod = 'POST' | 'GET' | 'OPTIONS' | 'PUT' | 'PATCH' | 'DELETE';

type CreateResponseOptions = {
  statusCode?: number;
  allowMethods?: HTTPMethod[] | null;
  headers?: Record<string, string>;
};

export const createResponse = (
  data: any,
  { statusCode = 200, allowMethods = null, headers = {} }: CreateResponseOptions = {},
): HandlerResponse => {
  return {
    statusCode,
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': allowMethods?.join(', ') ?? '*',
      ...headers,
    },
  };
};

type CreateHandlerFunctionOptions<Payload = unknown> = {
  event: HandlerEvent;
  context: HandlerContext;
  payload: Payload | null;
};

type CreateHandlerOptions = {
  allowMethods?: HTTPMethod[];
} | null;

type CreateHandlerFunction<Payload = unknown, Response = unknown> = (
  options: CreateHandlerFunctionOptions<Payload>,
) => Promise<{
  status: 'ok' | 'error';
  // TODO: not implemented
  statusCode?: number;
  headers?: Record<string, string>;
  data?: Response;
} | null>;

export const createHandler = <Payload = unknown>(
  options: CreateHandlerOptions,
  func: CreateHandlerFunction<Payload>,
): Handler => {
  return async (event, context) => {
    if (event.httpMethod === 'OPTIONS') {
      return createResponse(
        { message: 'Successful preflight call.' },
        { allowMethods: options?.allowMethods },
      );
    }

    if (options?.allowMethods && !options.allowMethods.includes(event.httpMethod as HTTPMethod)) {
      return createResponse(`You cannot use HTTP method "${event.httpMethod}" for this endpoint`, {
        statusCode: 400,
        allowMethods: options.allowMethods,
      });
    }

    try {
      const payload =
        event.body && !event.isBase64Encoded ? (JSON.parse(event.body) as Payload) : null;

      const { statusCode, headers, ...result } = (await func({ event, context, payload })) || {};

      return createResponse(result, {
        statusCode,
        headers,
        allowMethods: options?.allowMethods,
      });
    } catch (e) {
      console.error(e);

      return createResponse(
        { status: 'error' },
        {
          statusCode: 500,
          allowMethods: options?.allowMethods,
        },
      );
    }
  };
};

export const initStripeClient = () => {
  return new Stripe(STRIPE_API_KEY, {
    apiVersion: '2024-04-10',
  });
};

type ShippingRatesListOptions = {
  minimumWeightThreshold: number;
};

export const getStripeAllowableShippingRates = async (
  stripe: Stripe,
  { minimumWeightThreshold }: ShippingRatesListOptions,
) => {
  const { data: shippingRates } = await stripe.shippingRates.list({
    active: true,
    limit: 100,
  });

  return shippingRates.filter(
    shippingRate =>
      +shippingRate.metadata.minWeight <= minimumWeightThreshold &&
      (!shippingRate.metadata.maxWeight ||
        +shippingRate.metadata.maxWeight >= minimumWeightThreshold),
  );
};

export const getStripeProductsList = async (stripe: Stripe) => {
  const { data: products } = await stripe.products.list({
    active: true,
    limit: 100,
  });

  return products;
};

export type ProductPrices = Record<
  Stripe.Price['id'],
  {
    amount: number;
    quantity: number;
  }
>;

export const getStripeProductPricesList = async (
  stripe: Stripe,
  productId: Stripe.Product['id'],
) => {
  const { data: prices } = await stripe.prices.list({
    product: productId,
    active: true,
    limit: 100,
  });

  return prices;
};

export const processProductPrices = (prices: Stripe.Price[]) =>
  prices.reduce<ProductPrices>((resultPrices, price) => {
    resultPrices[price.id] = {
      amount: price.active ? (price.unit_amount ?? 0) / 100 : 0,
      quantity: +(price.metadata.quantity ?? 0),
    };

    return resultPrices;
  }, {});

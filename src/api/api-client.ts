export type NetlifyFunction = 'get-product' | 'get-products' | 'checkout' | 'confirm-order';

export type NetlifyResponse<Response> = {
  status: string;
  data: Response;
};

type NetlifyRequestOptions<Payload> = {
  payload?: Payload;
  method?: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';
  params?: Record<string, string>;
};

export const netlifyRequest = async <Response, Payload = any>(
  funcName: NetlifyFunction,
  { payload, method = 'GET', params = {} }: NetlifyRequestOptions<Payload> = {},
) => {
  let body: BodyInit | null = null;

  if (payload instanceof FormData) {
    body = payload;
    //
  } else if (payload) {
    body = JSON.stringify(payload);
  }

  const response = await fetch(
    `${process.env.NETLIFY_SERVER || ''}/.netlify/functions/${funcName}?${new URLSearchParams(
      params,
    ).toString()}`,
    {
      method,
      body,
    },
  );

  if (!response.ok) {
    return Promise.reject(await response.json());
  }

  return (await response.json()) as NetlifyResponse<Response>;
};


export type NetlifyResponse = {
  status: string
}

export type NetlifyMakeOrder = {
  name: string
  phone: string
  items: string[]
  totalPrice: number
}

export const netlifyMakeOrder = async (data: NetlifyMakeOrder): Promise<NetlifyResponse> =>
  (
    await fetch(`${process.env.NETLIFY_SERVER || ''}/.netlify/functions/make-order`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      })
  ).json();


export type NetlifyResponse = {
  status: string
}

export type NetlifyMakeOrder = {
  fullname: string
  phone: string
  comment: string
  totalPrice: number
  items: string[]
}

export const netlifyMakeOrder = async (data: NetlifyMakeOrder): Promise<NetlifyResponse> =>
  (
    await fetch(`${process.env.NETLIFY_SERVER || ''}/.netlify/functions/make-order`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      })
  ).json();

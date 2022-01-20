import { Handler } from '@netlify/functions';
import { Telegraf } from 'telegraf';

const CHAT_ID = 795507995;

const app = new Telegraf(process.env.BOT_TOKEN);

type DataT = {
  fullname: string
  phone: string
  deliveryAddress: string
  totalPrice: number
  comment: string
  items: string[]
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

const handler: Handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Successful preflight call.' })
    };
  }
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 400,
      body: 'You are not using a http POST method for this endpoint.',
      headers: {
        'Allow': 'POST'
      }
    };
  }
  const data: DataT = JSON.parse(event.body);

  let order = `*Full name:* ${data.fullname}\n`;
  order += `*Ph.:* ${data.phone}\n`;
  order += `*Delivery address:* ${data.deliveryAddress}\n`;
  order += `*Total price:* ${data.totalPrice} UAH\n`;
  if (data.comment) {
    order += `*Comment:* ${data.comment}\n`;
  }
  order += `*Items:*\n`;
  order += `${data.items.join('\n')}`;

  await app.telegram.sendMessage(
    CHAT_ID,
    order.replace(/[-.+?^$[\](){}\\=]/g, '\\$&'),
    {
      parse_mode: 'MarkdownV2'
    });

  return {
    headers,
    statusCode: 200,
    body: JSON.stringify({ status: 'ok' })
  };
};

export { handler };

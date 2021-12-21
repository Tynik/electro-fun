import { Handler } from '@netlify/functions';
import { Telegraf } from 'telegraf';

const CHAT_ID = 5033789131;

const app = new Telegraf(process.env.BOT_TOKEN);

const handler: Handler = async (event, context) => {
  await app.telegram.sendMessage(CHAT_ID, 'order');

  return {
    statusCode: 200,
    body: JSON.stringify({ status: 'ok' }),
  };
};

export { handler };

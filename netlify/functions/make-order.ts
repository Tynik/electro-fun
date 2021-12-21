import { Handler } from '@netlify/functions';
import { Telegraf } from 'telegraf';

const app = new Telegraf(process.env.BOT_TOKEN);

const handler: Handler = async (event, context) => {
  await app.telegram.sendMessage(5033789131, 'order');

  return {
    statusCode: 200,
    body: JSON.stringify({ status: 'ok' }),
  };
};

export { handler };

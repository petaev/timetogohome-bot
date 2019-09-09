require('dotenv').config();

const workBot = require('node-telegram-bot-api');
const Agent = require('https-proxy-agent');
const token = process.env.TOKEN;


const bot = new workBot(token,
    {
        polling: true,
        request: {
            agent: new Agent({
                host: process.env.PROXY_HOST,
                port: process.env.PROXY_PORT
            })
        }
    }
);

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'До конца рабочего дня');
});
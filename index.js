require('dotenv').config();

const workBot = require('node-telegram-bot-api');
const Agent = require('https-proxy-agent');
const token = process.env.TOKEN;


const bot = new workBot(token,
    {
        polling: true
        // request: {
        //     agent: new Agent({
        //         host: process.env.PROXY_HOST,
        //         port: process.env.PROXY_PORT
        //     })
        // }
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


  let res = 'Рабочий день закончен!';
  let now = new Date();
  let endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getDay() == 5 ? 17 : 18);
  
  const getFormatedTime = (seconds) => {
      let hours = Math.floor(seconds / 3600);
      let minutes = Math.floor((seconds - (hours * 3600)) / 60);
      let sec = seconds - (hours * 3600) - (minutes * 60);
      return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (sec < 10 ? '0' + Math.floor(sec) : Math.floor(sec));
  }   
  

  // let result = 'Рабочий день закончен';
  let now_tick = new Date();
  let diff = endDate.getTime() - now_tick.getTime();

  if (diff > 0) {
    res = 'До конца рабочего дня: ' + getFormatedTime(diff / 1000)
  }

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, res);
});
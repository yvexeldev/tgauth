import { bot, messages } from '../config/index.js';

bot.on('message', async (ctx) => {
    await ctx.reply(messages.getCode);
});

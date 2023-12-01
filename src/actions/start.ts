import { Context } from 'grammy';
import { ALLOWED_STEPS, STEPS, bot, messages } from '../config/index.js';
import { userService } from '../services/index.js';
import { keyboardText } from '../config/messages.js';

bot.command('start', async (ctx: Context) => {
    const userStep = await userService.getStep(ctx);
    if (!ALLOWED_STEPS.includes(userStep as string)) {
        await userService.createUser(ctx);
        await ctx.reply(messages.greeting(ctx.from?.first_name as string), {
            reply_markup: {
                keyboard: [[{ text: keyboardText, request_contact: true }]],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });
        await userService.changeStep(ctx, STEPS.SEND_PHONE);
    } else {
        await ctx.reply(messages.getCode);
    }
});

import { Context } from 'grammy';
import { STEPS, bot, messages } from '../config/index.js';
import { cacheService, otpService, userService } from '../services/index.js';

bot.command('login', async (ctx: Context) => {
    const telegram_id = ctx.from?.id;
    if (await userService.checkStep(ctx, STEPS.SEND_CODE)) {
        const otpCode = otpService.generateOTP();
        await cacheService.saveToCache(otpCode, `${telegram_id}`);
        await ctx.reply(messages.yourCode(otpCode), {
            parse_mode: 'HTML'
        });
        await userService.changeStep(ctx, STEPS.SEND_CODE);
    } else {
        await ctx.reply('Something went wrong: /start');
    }
});

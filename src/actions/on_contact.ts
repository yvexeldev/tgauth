import { Context } from 'grammy';

import { STEPS, bot, messages } from '../config/index.js';
import { cacheService, contactService, otpService, userService } from '../services/index.js';
import { User } from '../models/index.js';

bot.on(':contact', async (ctx: Context) => {
    if (await userService.checkStep(ctx, STEPS.SEND_PHONE)) {
        const contact = ctx.message?.contact;
        const telegram_id = ctx.from?.id;
        if (contactService.checkContact(ctx)) {
            await User.update({ phone_number: contact?.phone_number }, { where: { telegram_id } });
            const otpCode = otpService.generateOTP();
            await cacheService.saveToCache(otpCode, `${telegram_id}`);
            await ctx.reply(messages.yourCode(otpCode), {
                parse_mode: 'HTML'
            });
            await userService.changeStep(ctx, STEPS.SEND_CODE);
            await ctx.reply(messages.getCode);
        } else {
            ctx.reply('Please send your phone number! (click the button below!)');
        }
    }
});

export {};

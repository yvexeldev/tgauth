import { Context } from 'grammy';

export const checkContact = (ctx: Context) => {
    const contact = ctx.message?.contact;
    return contact?.user_id === ctx.from?.id;
};

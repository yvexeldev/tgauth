import { Context } from 'grammy';
import { STEPS } from '../config/index.js';
import { User } from '../models/index.js';

export const createUser = async (ctx: Context) => {
    try {
        const buildUser = {
            first_name: ctx.from?.first_name,
            last_name: ctx.from?.last_name,
            telegram_id: ctx.from?.id,
            username: ctx.from?.username,
            last_step: STEPS.SEND_PHONE
        };
        if (await isUserExists(ctx)) {
            return null;
        }
        const newUser = await User.create(buildUser);
        return newUser;
    } catch (error) {
        console.error('Error while creating user:', error);
    }
};

export const isUserExists = async (ctx: Context) => {
    try {
        const user = await findUserByTelegramId(ctx.from?.id as number);
        return !!user;
    } catch (error) {
        console.error(`Error while checking is user exists - ${error}`);
    }
};

export const findUserByTelegramId = async (telegram_id: number) => {
    try {
        const user = await User.findOne({ where: { telegram_id } });
        return user;
    } catch (error) {
        console.error(`Error while finding user by [${telegram_id}] id - ${error}`);
    }
};

export const checkStep = async (ctx: Context, step: string) => {
    try {
        const userStep = await getStep(ctx);
        return userStep === step;
    } catch (error) {
        console.error(`Error while checking [step-${step}] - ${error}`);
    }
};

export const getStep = async (ctx: Context) => {
    try {
        const user = await findUserByTelegramId(ctx.from?.id as number);
        return user?.last_step;
    } catch (error) {
        console.error(`Error while getting step for user - ${error}`);
    }
};

export const changeStep = async (ctx: Context, step: string) => {
    try {
        const telegram_id = ctx.from?.id;
        await User.update({ last_step: step }, { where: { telegram_id } });
    } catch (error) {
        console.error(`Error while cheking step for user [${ctx.from?.id}] - ${error}`);
    }
};

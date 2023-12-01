import { CHANNEL } from './index.js';

export const greeting = (first_name: string) => {
    return (
        `Hi ${first_name} 👋\n` +
        `Welcome to ${CHANNEL}'s official auth bot!\n\n` +
        `⬇ Send your contact (by clicking the button!)`
    );
};
export const contactKeyboard = '';
export const getCode = `🔑 Send /login to get new code`;
export const keyboardText = `☎️ Send phone number`;
export const yourCode = (otpCode: string) => `🔒Your code: <code>${otpCode}</code>`;

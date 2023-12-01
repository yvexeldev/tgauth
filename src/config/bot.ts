import { Bot } from 'grammy';
import { config } from '../services/index.js';

const BOT_TOKEN = config.getOrThrow('BOT_TOKEN');
export const CHANNEL = config.get('CHANNEL') || '<CHANNEL>';
const bot = new Bot(BOT_TOKEN as string);

export { bot };

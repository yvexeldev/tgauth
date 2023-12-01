import jwt from 'jsonwebtoken';
import { config } from './index.js';
const SECRET_KEY = (config.get('JWT_SECRET_KEY') as string) || 'MyJwtSecretKeyy';
const EXPIRES_IN = (config.get('EXPIRES_IN') as string) || '48h';

export const generateToken = (telegram_id: string) => {
    return jwt.sign({ telegram_id }, SECRET_KEY, {
        expiresIn: EXPIRES_IN
    });
};

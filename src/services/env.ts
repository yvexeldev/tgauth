import 'dotenv/config';

export const config = {
    get: (value: string) => {
        return process.env[value] || null;
    },
    getOrThrow: (value: string) => {
        if (process.env[value]) {
            return process.env[value];
        }
        throw new Error(`${value} not found in .env!`);
    }
};

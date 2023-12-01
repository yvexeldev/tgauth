import { CACHE_OTP_PREFIX, CACHE_TTL, CACHE_USER_ID_PREFIX, memoryCache } from '../config/index.js';
import { getCurrentTime } from './logger.js';


export const saveToCache = async (otp: string, user_id: string) => {
    otp = CACHE_OTP_PREFIX + otp;
    user_id = CACHE_USER_ID_PREFIX + user_id;
    try {
        await memoryCache.del(otp);
        await memoryCache.set(otp, user_id, CACHE_TTL);
        console.log(
            `[${getCurrentTime()}] - [${otp}] with id: [${user_id}] saved to cache for [${CACHE_TTL / 1000 / 60} min]`
        );
    } catch (error) {
        console.log(`[${getCurrentTime()}] - Error while saving to cache id-${user_id}!\n${error}`);
    }
};

export const getUserIdByOtp = async (otp: string) => {
    try {
        const dataFromCache = await memoryCache.get(`otp-${otp}`);
        const id = `${dataFromCache}`.split('user-')[1];
        return id;
    } catch (error) {
        console.log(`[${getCurrentTime()}] - Error while getting data by otp code!\n${error}`);
    }
};

import { caching } from 'cache-manager';

export const CACHE_TTL = 60 * 1000;
export const CACHE_OTP_PREFIX = 'otp-';
export const CACHE_USER_ID_PREFIX = 'user-';

export const memoryCache = await caching('memory', {
    max: 100,
    ttl: CACHE_TTL
});

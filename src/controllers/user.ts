import { Request, Response } from 'express';
import { cacheService, jwtService } from '../services/index.js';
import { OtpCheckDto } from '../dto/user.js';
import { validate } from 'class-validator';
import { getCurrentTime } from '../services/logger.js';

export const checkOtp = async (req: Request, res: Response) => {
    try {
        const otpDto = new OtpCheckDto();
        otpDto.otp = req.body.otp;

        const errors = await validate(otpDto);

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const userId = await cacheService.getUserIdByOtp(otpDto.otp);
        if (userId) {
            const token = jwtService.generateToken(userId);

            return res.status(200).json({
                token,
                success: true
            });
        }
        return res.status(400).json({
            message: 'OTP code is incorrect!',
            success: false
        });
    } catch (error) {
        console.error(`[${getCurrentTime()}] - Error while checking otp! - ${error}`);
        console.log(error);
    }
};

import { Request, Response, NextFunction } from 'express';
import { cacheService, jwtService } from '../services/index.js';
import { OtpCheckDto } from '../dto/user.js';
import { validate } from 'class-validator';
import { getCurrentTime } from '../services/logger.js';

import { User } from '../models/User.js';

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

export const getUserData = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.telegram_id;
        const user = await User.findOne({ where: { telegram_id: userId } });
        if (user)
            res.status(200).json({
                user,
                success: true
            });
        else
            res.status(204).send({
                message: 'User Not Found!',
                success: false
            });
    } catch (error) {
        console.error(`[${getCurrentTime()}] - Error while getting user data! - ${error}`);
        console.log(error);
    }
};

export const authUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized: No token provided',
                success: false
            });
        }
        const decodedToken = jwtService.verifyToken(token);
        // @ts-ignore
        req.user = decodedToken;

        if (decodedToken) {
            console.log('KELDI!');
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error,
            message: 'Internal Server Error',
            success: false
        });
    }
};

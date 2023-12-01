import { Router } from 'express';
import { userController } from '../controllers/index.js';

const router = Router();

router.post('/otp', userController.checkOtp);

export { router as userRouter };

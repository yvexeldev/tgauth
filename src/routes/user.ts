import { Router } from 'express';
import { userController } from '../controllers/index.js';

const router = Router();

router.post('/otp', userController.checkOtp);
router.get('/me', userController.authUser, userController.getUserData);

export { router as userRouter };

import { Router } from 'express';
import { userRouter } from './index.js';

const router = Router();
router.use('/user', userRouter);

export { router as mainRoutes };

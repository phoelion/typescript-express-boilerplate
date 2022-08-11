import { Router } from 'express';
import AuthController from './controller';

const authController = new AuthController();
const authRouter = Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.post('/refresh-tokens', authController.refreshTokens);

export default authRouter;

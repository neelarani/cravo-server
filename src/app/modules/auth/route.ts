import { Router } from 'express';
import * as controller from './controller';

const router = Router();

router.post('/login', controller.login);

router.post('/forgot-password', controller.forgotPassword);

router.post('/reset-password', controller.resetPassword);

router.get('/me', controller.getMe);

router.post('/logout', controller.logout);

export default router;

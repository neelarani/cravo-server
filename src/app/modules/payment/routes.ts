import { Router, raw } from 'express';
import * as controller from './controller';
import { auth } from '@/app/middlewares/auth';
import { Role } from '../user/interface';

const router = Router();

router.post(
  '/create',
  auth(Role.USER, Role.ADMIN),
  controller.createOrderController
);

router.post(
  '/webhook',
  raw({ type: 'application/json' }),
  controller.handleStripeWebhookEvent
);

export default router;

import { Router, raw } from 'express';
import * as controller from './controller';

const router = Router();

router.post(
  '/webhook',
  raw({ type: 'application/json' }),
  controller.handleStripeWebhookEvent
);

export default router;

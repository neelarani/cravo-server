import { Router } from 'express';
import * as controller from './controller';
import { auth } from '@/app/middlewares/auth';
import { Role } from '../user/interface';
import { fileUploader } from '@/shared';
import { validateRequest } from '@/app/middlewares/validateRequest';

import * as validation from './validation';

const router = Router();

router.post(
  '/create-menu',
  auth(Role.ADMIN, Role.SUPPER_ADMIN),
  fileUploader.upload.single('file'),
  validateRequest(validation.foodItemSchema),
  controller.createMenu
);

export default router;

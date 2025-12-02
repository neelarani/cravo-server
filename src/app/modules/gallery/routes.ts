import { Router } from 'express';
import * as controller from './controller';
import * as validation from './validation';
import { auth } from '@/app/middlewares/auth';
import { Role } from '../user/interface';
import { fileUploader } from '@/shared';
import { validateRequest } from '@/app/middlewares/validateRequest';

const router = Router();

router.post(
  '/create-gallery',
  auth(Role.ADMIN, Role.SUPPER_ADMIN),
  fileUploader.upload.single('file'),
  validateRequest(validation.gallerySchema),
  controller.createGallery
);

router.get('/', controller.getAllGallery);

export default router;

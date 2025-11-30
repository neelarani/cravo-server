import { Router } from 'express';
import * as validation from './validation';
import { validateRequest } from '@/app/middlewares/validateRequest';
import * as controller from './controller';

const router = Router();

router.post(
  '/register',
  validateRequest(validation.createUserSchema),
  controller.createUser
);

router.get('/all-user', controller.getAllUser);
router.get('/:id', controller.getUserById);

export default router;

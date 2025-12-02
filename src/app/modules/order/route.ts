import * as controller from './controller';
import { auth } from '@/app/middlewares/auth';
import { Role } from '../user/interface';
import { Router } from 'express';

const router = Router();

router.post('/create', auth(Role.USER), controller.createOrderController);

export default router;

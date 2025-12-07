import * as controller from './controller';
import { auth } from '@/app/middlewares/auth';
import { Role } from '../user/interface';
import { Router } from 'express';

const router = Router();

router.post('/create', auth(Role.USER), controller.createOrderController);

router.get('/all-order', auth(Role.USER, Role.ADMIN), controller.allOrder);

export default router;

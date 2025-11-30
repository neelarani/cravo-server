import { Router } from 'express';
import * as modules from '@/app/modules';

const moduleRoutes: Array<{ path: string; route: Router }> = [
  {
    path: '/user',
    route: modules.userRoutes,
  },
  {
    path: '/auth',
    route: modules.authRoutes,
  },
  {
    path: '/menu',
    route: modules.authMenu,
  },
];

export default moduleRoutes.reduce(
  (router, { path, route }) => router.use(path, route),
  Router()
);

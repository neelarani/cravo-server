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
    route: modules.menuRoutes,
  },
  {
    path: '/gallery',
    route: modules.galleryRoutes,
  },
  {
    path: '/order',
    route: modules.orderRoutes,
  },
];

export default moduleRoutes.reduce(
  (router, { path, route }) => router.use(path, route),
  Router()
);

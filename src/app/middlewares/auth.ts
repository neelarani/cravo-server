import config from '@/config';
import { verifyToken } from '@/shared/helpers/jwtHelper';
import type { NextFunction, Request, Response } from 'express';

export const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.cookies?.token || req.cookies?.accessToken;

      if (!token) {
        throw new Error('You are not authorized!');
      }
      const verifyUser = verifyToken(token, config.jwt_secret);
      req.user = verifyUser;

      if (roles.length && !roles.includes(verifyUser.role)) {
        throw new Error('You are not authorized!');
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

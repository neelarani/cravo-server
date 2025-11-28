import type { IJWTPayload } from '@/interface';
import type { Secret, SignOptions } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export const generateToken = (
  payload: any,
  secret: Secret,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn,
  } as SignOptions);

  return token;
};

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as IJWTPayload;
};

export type IJWTPayload = {
  email: string;
  role: 'USER' | 'ADMIN' | 'SUPPER_ADMIN';
};

import bcrypt from 'bcryptjs';
import type { IUser } from './interface';
import { User } from './model';
import { AppError } from '@/app/errors';
import { HTTP_CODE } from '@/shared/constants/httpStatusCode';

export const createUser = async (payload: Partial<IUser>) => {
  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser && existingUser.email === payload.email) {
    throw new AppError(
      HTTP_CODE.BAD_REQUEST,
      'User already exists with the same email!'
    );
  }
  const hashedPassword = bcrypt.hashSync(
    payload.password!,
    bcrypt.genSaltSync(10)
  );

  const newUser = await User.create({
    ...payload,
    password: hashedPassword,
  });

  const { password, ...userObj } = newUser.toObject();

  return userObj;
};

export const getAllUser = async () => {
  const users = await User.find({}).lean();
  if (!users) throw new Error('User not found');

  const usersWithoutPassword = users.map(({ password, ...user }) => user);

  return usersWithoutPassword;
};

export const getUserById = async (id: string) => {
  const user = await User.findOne({ _id: id }).lean();
  if (!user) throw new AppError(HTTP_CODE.NOT_FOUND, 'User not found');
  const { password, ...userObj } = user;
  return userObj;
};

import bcrypt from 'bcryptjs';
import { User } from '../user/model';
import { HTTP_CODE } from '@/shared/constants/httpStatusCode';
import { AppError } from '@/app/errors';
import { generateToken, verifyToken } from '@/shared/helpers/jwtHelper';
import config from '@/config';
import type { IUser } from '../user/interface';
import type { JwtPayload, Secret } from 'jsonwebtoken';
import { emailSender } from '@/shared';

export const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({
    email: payload.email,
  })
    .select('+password')
    .lean<IUser>();

  if (!user) {
    throw new AppError(HTTP_CODE.NOT_FOUND, 'User not found');
  }

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isCorrectPassword)
    throw new AppError(HTTP_CODE.BAD_REQUEST, 'Password is incorrect!');

  const accessToken = generateToken(
    { email: user.email, role: user.role },
    config.jwt_secret as Secret,
    '24h'
  );

  const refreshToken = generateToken(
    { email: user.email, role: user.role },
    config.refresh_token as Secret,
    '90d'
  );
  const { password, ...userInfo } = user;
  return {
    accessToken,
    refreshToken,
    userInfo,
  };
};

export const forgotPassword = async (payload: { email: string }) => {
  const userData = await User.findOne({
    email: payload.email,
  }).lean();

  if (!userData) {
    throw new AppError(HTTP_CODE.NOT_FOUND, 'User not found!');
  }

  const resetPassToken = generateToken(
    {
      userId: userData._id,
    },
    config.reset_pass_secret as Secret,
    config.reset_pass_token_expires_in as string
  );

  const resetPassLink = config.reset_pass_link + `?token=${resetPassToken}`;

  await emailSender(
    userData.email,
    `
        <div>
            <p>Dear User,</p>
            <p>Your password reset link 
                <a href=${resetPassLink}>
                    <button>
                        Reset Password
                    </button>
                </a>
            </p>

        </div>
        `
  );
};

export const resetPassword = async (token: string, password: string) => {
  const { userId } = verifyToken(
    token,
    config.reset_pass_secret
  ) as JwtPayload as {
    userId: string;
  };

  const user = await User.findById(userId);

  if (!user) throw new AppError(HTTP_CODE.BAD_REQUEST, 'User not found!');

  const hasPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.findByIdAndUpdate(
    userId,
    { password: hasPassword },
    { runValidators: true }
  );
};

export const getMe = async (user: any) => {
  const accessToken = user.accessToken;

  if (!accessToken) {
    throw new AppError(HTTP_CODE.UNAUTHORIZED, 'Not authenticated');
  }

  const decodedData = verifyToken(accessToken, config.jwt_secret as Secret);

  const userData = await User.findOne({ email: decodedData.email }).lean();

  if (!userData) {
    throw new AppError(HTTP_CODE.NOT_FOUND, 'User not found');
  }

  return userData;
};

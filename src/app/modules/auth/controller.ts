import { catchAsync } from '@/shared/utils/catchAsync';
import * as service from './service';
import { sendResponse } from '@/shared/common/sendResponse';
import { HTTP_CODE } from '@/shared/constants/httpStatusCode';

export const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, userInfo } = await service.login(req.body);

  res.cookie('accessToken', accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60,
  });
  res.cookie('refreshToken', refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 90,
  });

  sendResponse(res, {
    status: HTTP_CODE.OK,
    success: true,
    message: 'User loggedin successfully!',
    data: {
      accessToken,
      refreshToken,
      user: userInfo,
    },
  });
});

export const logout = catchAsync(async (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 0,
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 0,
  });
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: 'Logged Out',
    data: null,
  });
});

export const forgotPassword = catchAsync(async (req, res) =>
  sendResponse(res, {
    status: HTTP_CODE.OK,
    success: true,
    message: 'Check your email!',
    data: await service.forgotPassword(req.body),
  })
);

export const resetPassword = catchAsync(async (req, res) =>
  sendResponse(res, {
    status: HTTP_CODE.OK,
    success: true,
    message: 'Password Reset!',
    data: await service.resetPassword(
      req.query.token as string,
      req.body.password
    ),
  })
);

export const getMe = catchAsync(async (req, res) =>
  sendResponse(res, {
    status: HTTP_CODE.OK,
    success: true,
    message: 'User retrieve successfully!',
    data: await service.getMe(req.cookies),
  })
);

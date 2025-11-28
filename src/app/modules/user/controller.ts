import { sendResponse } from '@/shared/common/sendResponse';
import { HTTP_CODE } from '@/shared/constants/httpStatusCode';
import { catchAsync } from '@/shared/utils/catchAsync';
import * as service from './service';

export const createUser = catchAsync(async (req, res) => {
  const userInfo = req.body;
  const createdUser = await service.createUser(userInfo);

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.CREATED,
    message: `User Created Successfully!`,
    data: createdUser,
  });
});

export const getAllUser = catchAsync(async (req, res) => {
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: `User Retrieve Successfully!`,
    data: await service.getAllUser(),
  });
});

export const getUserById = catchAsync(async (req, res) => {
  const userId = req.params.id as string;
  const result = await service.getUserById(userId);

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: `User Retrieve Successfully!`,
    data: result,
  });
});

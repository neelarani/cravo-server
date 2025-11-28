import { sendResponse } from '@/shared/common/sendResponse';
import { HTTP_CODE } from '@/shared/constants/httpStatusCode';
import { catchAsync } from '@/shared/utils/catchAsync';

export const notFound = catchAsync(async (_, res) => {
  sendResponse(res, {
    success: false,
    status: HTTP_CODE.NOT_FOUND,
    message: 'Route not found!',
  });
});

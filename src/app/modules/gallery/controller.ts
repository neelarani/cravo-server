import { sendResponse } from '@/shared/common/sendResponse';
import { HTTP_CODE } from '@/shared/constants/httpStatusCode';
import { catchAsync } from '@/shared/utils/catchAsync';

import * as service from './service';

export const createGallery = catchAsync(async (req, res) => {
  const gallery = req.body;

  const createdGallery = await service.createGallery(gallery, req.file);

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.CREATED,
    message: `Gallery Created Successfully!`,
    data: createdGallery,
  });
});

// GET ALL
export const getAllGallery = catchAsync(async (req, res) => {
  const gallery = await service.getAllGallery();

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: `Gallery fetched successfully!`,
    data: gallery,
  });
});

import * as service from './service';
import { sendResponse } from '@/shared/common/sendResponse';
import { HTTP_CODE } from '@/shared/constants/httpStatusCode';
import { catchAsync } from '@/shared/utils/catchAsync';
import type { Request } from 'express';

export const createOrderController = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const { foodId, quantity, paymentMethod } = req.body;
    const userId = req.user?._id; // auth middleware থেকে আসবে

    if (!foodId || !quantity || !paymentMethod) {
      return sendResponse(res, {
        success: false,
        status: HTTP_CODE.BAD_REQUEST,
        message: 'All fields are required',
      });
    }

    const order = await service.createOrder(
      userId,
      foodId,
      Number(quantity),
      paymentMethod.toUpperCase() as 'COD' | 'ONLINE'
    );

    return sendResponse(res, {
      success: true,
      status: HTTP_CODE.CREATED,
      message: 'Order created successfully',
      data: order,
    });
  }
);

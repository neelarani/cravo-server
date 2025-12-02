import * as service from './service';
import { sendResponse } from '@/shared/common/sendResponse';
import { HTTP_CODE } from '@/shared/constants/httpStatusCode';
import { catchAsync } from '@/shared/utils/catchAsync';
import type { Request, Response } from 'express';

export const createOrderController = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { foodId, quantity, paymentMethod } = req.body;
    const userId = req.user?.id || req.user?._id;

    if (!foodId || !quantity || !paymentMethod) {
      return sendResponse(res, {
        success: false,
        status: HTTP_CODE.BAD_REQUEST,
        message: 'All fields are required',
      });
    }

    const result = await service.createOrder(
      userId,
      foodId,
      Number(quantity),
      paymentMethod.toUpperCase() as 'COD' | 'ONLINE'
    );

    // COD হলে direct order confirm
    if (paymentMethod.toUpperCase() === 'COD') {
      return sendResponse(res, {
        success: true,
        status: HTTP_CODE.CREATED,
        message: 'Order placed successfully (COD)',
        data: { order: result.order },
      });
    }

    // ONLINE হলে checkout URL return
    return sendResponse(res, {
      success: true,
      status: HTTP_CODE.CREATED,
      message: 'Order created, proceed to payment',
      data: {
        order: result.order,
        payment: result.payment,
        checkoutUrl: result.checkoutUrl,
      },
    });
  }
);

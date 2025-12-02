import { catchAsync } from '@/shared/utils/catchAsync';
import { sendResponse } from '@/shared/common/sendResponse';
import { HTTP_CODE } from '@/shared/constants/httpStatusCode';
import * as service from './service';
import type { Request, Response } from 'express';
import { stripe } from '@/shared/helpers/stripe';
import config from '@/config';
import type Stripe from 'stripe';

export const createOrderController = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { foodId, quantity, paymentMethod } = req.body;
    const userId = req.user?._id || req.user?.id;

    if (!foodId || !quantity || !paymentMethod)
      return sendResponse(res, {
        success: false,
        status: HTTP_CODE.BAD_REQUEST,
        message: 'All fields are required',
      });

    const result = await service.createOrder(
      userId,
      foodId,
      Number(quantity),
      paymentMethod.toUpperCase() as 'COD' | 'ONLINE'
    );

    if (paymentMethod.toUpperCase() === 'COD') {
      return sendResponse(res, {
        success: true,
        status: HTTP_CODE.CREATED,
        message: 'Order placed successfully (COD)',
        data: { order: result.order },
      });
    }

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

// Stripe webhook
export const handleStripeWebhookEvent = catchAsync(async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      config.stripe_webhook_secret_key
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // cast to Checkout.Session
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const paymentId = session.metadata?.paymentId;

    if (!paymentId) {
      return res.status(400).send('Payment ID not found in metadata');
    }

    const result = await service.confirmOnlinePayment(paymentId, session);

    return sendResponse(res, {
      status: 200,
      success: true,
      message: 'Webhook processed successfully',
      data: result,
    });
  }
});

import { Order } from '../order/model';
import { PaymentStatus } from './interface';
import { Payment } from './model';

export const Webhook = {
  async completeCheckout(session: any) {
    const userId = session.metadata?.userId;
    const orderId = session.metadata?.orderId;
    const paymentId = session.metadata?.paymentId;

    if (!paymentId || !orderId) {
      console.log('Missing metadata in webhook.');
      return;
    }

    // Update Payment
    await Payment.findByIdAndUpdate(paymentId, {
      user: userId,
      order: orderId,
      status:
        session.payment_status === 'paid'
          ? PaymentStatus.PAID
          : PaymentStatus.UNPAID,
      paymentGatewayData: session,
    });

    // Update Order
    await Order.findByIdAndUpdate(orderId, {
      payment: paymentId,
    });

    return { orderId, paymentId };
  },
};

import { Order } from '../order/model';
import { Payment, PaymentStatus } from './model';
import { FoodItem } from '../Menu/model';
import config from '@/config';
import { stripe } from '@/shared/helpers/stripe';

export const createOrder = async (
  userId: string,
  foodId: string,
  quantity: number,
  paymentMethod: 'COD' | 'ONLINE'
) => {
  const food = await FoodItem.findById(foodId);
  if (!food) throw new Error('Food not found');

  const totalPrice = Number(food.price) * quantity;

  // 1️⃣ Order create
  const order = await Order.create({
    user: userId,
    food: foodId,
    quantity,
    totalPrice,
    paymentMethod,
    paymentStatus:
      paymentMethod === 'COD' ? PaymentStatus.UNPAID : PaymentStatus.UNPAID,
  });

  // 2️⃣ Payment create
  const payment = await Payment.create({
    user: userId,
    order: order._id,
    amount: totalPrice,
    status:
      paymentMethod === 'COD' ? PaymentStatus.UNPAID : PaymentStatus.UNPAID,
  });

  let checkoutUrl: string | null = null;

  // 3️⃣ Online payment হলে Stripe session generate
  if (paymentMethod === 'ONLINE') {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: food.title },
            unit_amount: totalPrice * 100,
          },
          quantity,
        },
      ],
      success_url: `${config.client_url}/payment-success?orderId=${order._id}`,
      cancel_url: `${config.client_url}/payment-cancel`,
      metadata: {
        userId,
        orderId: order._id.toString(),
        paymentId: payment._id.toString(),
      },
    });

    checkoutUrl = session.url;
  }

  return { order, payment, checkoutUrl };
};

export const confirmOnlinePayment = async (
  paymentId: string,
  stripeData?: any
) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) throw new Error('Payment not found');

  payment.status = PaymentStatus.PAID;
  if (stripeData) payment.paymentGatewayData = stripeData;
  await payment.save();

  const order = await Order.findById(payment.order);
  if (order) {
    order.paymentStatus = PaymentStatus.PAID;
    await order.save();
  }

  return { order, payment };
};

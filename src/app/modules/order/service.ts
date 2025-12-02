import Stripe from 'stripe';
import { Order } from './model';
import { Payment } from '../payment/model';
import { FoodItem } from '../Menu/model';

const stripe = new Stripe(process.env.SECRET_KEY!);
console.log(stripe);

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
    status: paymentMethod === 'COD' ? 'COD' : 'PENDING', // COD direct confirm
  });

  // 2️⃣ Payment create
  const payment = await Payment.create({
    user: userId,
    order: order._id,
    amount: totalPrice,
    status: paymentMethod === 'COD' ? 'PAID' : 'UNPAID',
  });

  let checkoutUrl = null;

  // 3️⃣ ONLINE payment হলে Stripe session তৈরি
  if (paymentMethod === 'ONLINE') {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: food.title },
            unit_amount: Number(food.price) * 100,
          },
          quantity,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/payment-success?orderId=${order._id}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
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

// 4️⃣ Stripe webhook e payment success handle
export const confirmOnlinePayment = async (paymentId: string) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) throw new Error('Payment not found');

  payment.status = 'PAID';
  await payment.save();

  const order = await Order.findById(payment.order);
  if (order) {
    order.status = 'PAID';
    await order.save();
  }

  return { order, payment };
};

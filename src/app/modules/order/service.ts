import { Order } from '../order/model';
import { FoodItem } from '../Menu/model';

export const createOrder = async (
  userId: string,
  foodId: string,
  quantity: number,
  paymentMethod: 'COD' | 'ONLINE'
) => {
  const food = await FoodItem.findById(foodId);
  if (!food) throw new Error('Food not found');

  const totalPrice = Number(food.price) * quantity;

  const orders = await Order.create({
    user: userId,
    food: foodId,
    quantity,
    totalPrice,
    paymentMethod,
    paymentStatus: paymentMethod === 'COD' ? 'UNPAID' : 'UNPAID', // ONLINE later update
  });

  return orders;
};

export const allOrder = async () => {
  const order = await Order.find();
  return order;
};

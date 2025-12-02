import { Schema, model, Types, Document } from 'mongoose';

export interface IOrder extends Document {
  user: Types.ObjectId;
  food: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  paymentMethod: 'COD' | 'ONLINE';
  paymentStatus: 'PAID' | 'UNPAID';
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    food: { type: Types.ObjectId, ref: 'FoodItem', required: true },
    quantity: { type: Number, default: 1 },
    totalPrice: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['COD', 'ONLINE'],
      default: 'COD',
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['PAID', 'UNPAID'],
      default: 'UNPAID',
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder>('Order', orderSchema);

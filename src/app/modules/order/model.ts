import { Schema, model, Types } from 'mongoose';

const orderSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    food: { type: Types.ObjectId, ref: 'FoodItem', required: true },
    quantity: { type: Number, default: 1 },
    totalPrice: { type: Number, required: true },

    payment: { type: Types.ObjectId, ref: 'Payment' },

    // New fields for dual payment option
    paymentMethod: {
      type: String,
      enum: ['ONLINE', 'COD'],
      default: 'COD',
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'PAID', 'COD'],
      default: 'PENDING',
    },
  },
  { timestamps: true }
);

export const Order = model('Order', orderSchema);

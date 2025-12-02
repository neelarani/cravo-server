import { Schema, model, Types } from 'mongoose';
import { PaymentStatus } from './interface';

const paymentSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    order: { type: Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.UNPAID,
    },
    transactionId: { type: String, unique: true, sparse: true },
    paymentGatewayData: { type: Object, default: {} },
  },
  { timestamps: true }
);

export const Payment = model('Payment', paymentSchema);

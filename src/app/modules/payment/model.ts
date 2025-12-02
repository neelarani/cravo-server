// models/payment.model.ts
import { Schema, model, Types, Document } from 'mongoose';

export enum PaymentStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
}

export interface IPayment extends Document {
  user: Types.ObjectId;
  order: Types.ObjectId;
  amount: number;
  status: PaymentStatus;
  transactionId?: string; // Stripe transaction id
  paymentGatewayData?: object; // Stripe response data
}

const paymentSchema = new Schema<IPayment>(
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

export const Payment = model<IPayment>('Payment', paymentSchema);

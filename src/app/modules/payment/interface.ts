export enum PaymentStatus {
  PAID,
  UNPAID,
}

export interface IPaymentStatus {
  userId: string;
  status: PaymentStatus;
  amount: number;
  createdAt: Date;
}

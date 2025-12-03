"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.PaymentStatus = void 0;
// models/payment.model.ts
const mongoose_1 = require("mongoose");
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["UNPAID"] = "UNPAID";
    PaymentStatus["PAID"] = "PAID";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
const paymentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    order: { type: mongoose_1.Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true },
    status: {
        type: String,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.UNPAID,
    },
    transactionId: { type: String, unique: true, sparse: true },
    paymentGatewayData: { type: Object, default: {} },
}, { timestamps: true });
exports.Payment = (0, mongoose_1.model)('Payment', paymentSchema);

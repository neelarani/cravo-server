"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    food: { type: mongoose_1.Types.ObjectId, ref: 'FoodItem', required: true },
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
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)('Order', orderSchema);

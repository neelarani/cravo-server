"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const model_1 = require("../order/model");
const model_2 = require("../Menu/model");
const createOrder = async (userId, foodId, quantity, paymentMethod) => {
    const food = await model_2.FoodItem.findById(foodId);
    if (!food)
        throw new Error('Food not found');
    const totalPrice = Number(food.price) * quantity;
    const orders = await model_1.Order.create({
        user: userId,
        food: foodId,
        quantity,
        totalPrice,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'UNPAID' : 'UNPAID', // ONLINE later update
    });
    return orders;
};
exports.createOrder = createOrder;

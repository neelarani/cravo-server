"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allOrder = exports.createOrder = void 0;
const model_1 = require("../order/model");
const model_2 = require("../Menu/model");
const createOrder = (userId, foodId, quantity, paymentMethod) => __awaiter(void 0, void 0, void 0, function* () {
    const food = yield model_2.FoodItem.findById(foodId);
    if (!food)
        throw new Error('Food not found');
    const totalPrice = Number(food.price) * quantity;
    const orders = yield model_1.Order.create({
        user: userId,
        food: foodId,
        quantity,
        totalPrice,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'UNPAID' : 'UNPAID', // ONLINE later update
    });
    return orders;
});
exports.createOrder = createOrder;
const allOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield model_1.Order.find();
    return order;
});
exports.allOrder = allOrder;

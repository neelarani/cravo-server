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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmOnlinePayment = exports.createOrder = void 0;
const model_1 = require("../order/model");
const model_2 = require("./model");
const model_3 = require("../Menu/model");
const config_1 = __importDefault(require("../../../config"));
const stripe_1 = require("../../../shared/helpers/stripe");
const createOrder = (userId, foodId, quantity, paymentMethod) => __awaiter(void 0, void 0, void 0, function* () {
    const food = yield model_3.FoodItem.findById(foodId);
    if (!food)
        throw new Error('Food not found');
    const totalPrice = Number(food.price) * quantity;
    // 1️⃣ Order create
    const order = yield model_1.Order.create({
        user: userId,
        food: foodId,
        quantity,
        totalPrice,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? model_2.PaymentStatus.UNPAID : model_2.PaymentStatus.UNPAID,
    });
    // 2️⃣ Payment create
    const payment = yield model_2.Payment.create({
        user: userId,
        order: order._id,
        amount: totalPrice,
        status: paymentMethod === 'COD' ? model_2.PaymentStatus.UNPAID : model_2.PaymentStatus.UNPAID,
    });
    let checkoutUrl = null;
    // 3️⃣ Online payment হলে Stripe session generate
    if (paymentMethod === 'ONLINE') {
        const session = yield stripe_1.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { name: food.title },
                        unit_amount: totalPrice * 100,
                    },
                    quantity,
                },
            ],
            success_url: `${config_1.default.client_url}/payment-success?orderId=${order._id}`,
            cancel_url: `${config_1.default.client_url}/payment-cancel`,
            metadata: {
                userId,
                orderId: order._id.toString(),
                paymentId: payment._id.toString(),
            },
        });
        checkoutUrl = session.url;
    }
    return { order, payment, checkoutUrl };
});
exports.createOrder = createOrder;
const confirmOnlinePayment = (paymentId, stripeData) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield model_2.Payment.findById(paymentId);
    if (!payment)
        throw new Error('Payment not found');
    payment.status = model_2.PaymentStatus.PAID;
    if (stripeData)
        payment.paymentGatewayData = stripeData;
    yield payment.save();
    const order = yield model_1.Order.findById(payment.order);
    if (order) {
        order.paymentStatus = model_2.PaymentStatus.PAID;
        yield order.save();
    }
    return { order, payment };
});
exports.confirmOnlinePayment = confirmOnlinePayment;

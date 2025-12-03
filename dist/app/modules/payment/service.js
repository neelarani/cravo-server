"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmOnlinePayment = exports.createOrder = void 0;
const model_1 = require("../order/model");
const model_2 = require("./model");
const model_3 = require("../Menu/model");
const config_1 = __importDefault(require("@/config"));
const stripe_1 = require("@/shared/helpers/stripe");
const createOrder = async (userId, foodId, quantity, paymentMethod) => {
    const food = await model_3.FoodItem.findById(foodId);
    if (!food)
        throw new Error('Food not found');
    const totalPrice = Number(food.price) * quantity;
    // 1️⃣ Order create
    const order = await model_1.Order.create({
        user: userId,
        food: foodId,
        quantity,
        totalPrice,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? model_2.PaymentStatus.UNPAID : model_2.PaymentStatus.UNPAID,
    });
    // 2️⃣ Payment create
    const payment = await model_2.Payment.create({
        user: userId,
        order: order._id,
        amount: totalPrice,
        status: paymentMethod === 'COD' ? model_2.PaymentStatus.UNPAID : model_2.PaymentStatus.UNPAID,
    });
    let checkoutUrl = null;
    // 3️⃣ Online payment হলে Stripe session generate
    if (paymentMethod === 'ONLINE') {
        const session = await stripe_1.stripe.checkout.sessions.create({
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
};
exports.createOrder = createOrder;
const confirmOnlinePayment = async (paymentId, stripeData) => {
    const payment = await model_2.Payment.findById(paymentId);
    if (!payment)
        throw new Error('Payment not found');
    payment.status = model_2.PaymentStatus.PAID;
    if (stripeData)
        payment.paymentGatewayData = stripeData;
    await payment.save();
    const order = await model_1.Order.findById(payment.order);
    if (order) {
        order.paymentStatus = model_2.PaymentStatus.PAID;
        await order.save();
    }
    return { order, payment };
};
exports.confirmOnlinePayment = confirmOnlinePayment;

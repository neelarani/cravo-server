"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderController = void 0;
const service = __importStar(require("./service"));
const sendResponse_1 = require("@/shared/common/sendResponse");
const httpStatusCode_1 = require("@/shared/constants/httpStatusCode");
const catchAsync_1 = require("@/shared/utils/catchAsync");
exports.createOrderController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { foodId, quantity, paymentMethod } = req.body;
    const userId = req.user?._id; // auth middleware থেকে আসবে
    if (!foodId || !quantity || !paymentMethod) {
        return (0, sendResponse_1.sendResponse)(res, {
            success: false,
            status: httpStatusCode_1.HTTP_CODE.BAD_REQUEST,
            message: 'All fields are required',
        });
    }
    const order = await service.createOrder(userId, foodId, Number(quantity), paymentMethod.toUpperCase());
    return (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: httpStatusCode_1.HTTP_CODE.CREATED,
        message: 'Order created successfully',
        data: order,
    });
});

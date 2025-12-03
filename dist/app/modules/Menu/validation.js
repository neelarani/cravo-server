"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodItemUpdateSchema = exports.foodItemSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.foodItemSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, 'Name is required'),
    title: zod_1.default.string().min(1, 'Title is required'),
    price: zod_1.default.string('Price is required'),
    img: zod_1.default.string().url('Invalid image URL').optional(),
    description: zod_1.default.string().min(1, 'Description is required'),
    category: zod_1.default.string('Category cannot be empty'),
});
exports.foodItemUpdateSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, 'Name is required').optional(),
    title: zod_1.default.string().min(1, 'Title is required').optional(),
    price: zod_1.default.number().positive('Price must be a positive number').optional(),
    img: zod_1.default.string().url('Invalid image URL').optional(),
    description: zod_1.default.string().min(1, 'Description is required').optional(),
    category: zod_1.default.string('Category cannot be empty').optional(),
});

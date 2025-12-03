"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gallerySchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.gallerySchema = zod_1.default.object({
    title: zod_1.default.string().min(1, 'Title is required'),
    description: zod_1.default.string().optional(),
    img: zod_1.default.string().url('Image must be a valid URL').optional(),
    category: zod_1.default.string().optional(),
});

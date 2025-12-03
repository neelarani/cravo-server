"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
// src/schemas/user.schema.ts
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password must not exceed 50 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/\d/, 'Password must contain at least one number')
        .regex(/[@$!%*?&]/, 'Password must contain at least one special character'),
    full_name: zod_1.z.string().min(1, 'Full name is required'),
    avatar_url: zod_1.z.string().url().nullable().optional(),
    phone: zod_1.z.string(),
});
// For updates: all fields optional
exports.updateUserSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    full_name: zod_1.z.string().min(1).optional(),
    avatar_url: zod_1.z.string().url().nullable().optional(),
    password: zod_1.z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password must not exceed 50 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/\d/, 'Password must contain at least one number')
        .regex(/[@$!%*?&]/, 'Password must contain at least one special character')
        .optional(),
    phone: zod_1.z.string().optional(),
});

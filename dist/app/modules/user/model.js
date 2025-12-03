"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const interface_1 = require("./interface");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    avatar_url: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: Object.values(interface_1.Role),
        default: interface_1.Role.USER,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
}, {
    versionKey: false,
});
exports.User = (0, mongoose_1.model)('User', userSchema);

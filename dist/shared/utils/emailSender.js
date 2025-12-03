"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailSender = void 0;
const config_1 = __importDefault(require("@/config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailSender = async (email, html) => {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: config_1.default.email,
            pass: config_1.default.app_pass,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    const info = await transporter.sendMail({
        from: `"Deepah Voice" <${config_1.default.email}>`,
        to: email,
        subject: 'Reset Password Link',
        html,
    });
    return info;
};
exports.emailSender = emailSender;

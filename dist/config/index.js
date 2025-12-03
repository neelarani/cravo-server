"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envalid_1 = require("envalid");
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
const env = (0, envalid_1.cleanEnv)(process.env, {
    NODE_ENV: (0, envalid_1.str)({ default: 'development' }),
    PORT: (0, envalid_1.num)({ default: 5000 }),
    DATABASE_URL: (0, envalid_1.str)(),
    JWT_SECRET: (0, envalid_1.str)(),
    REFRESH_TOKEN: (0, envalid_1.str)(),
    RESET_PASS_SECRET: (0, envalid_1.str)(),
    EMAIL: (0, envalid_1.str)(),
    APP_PASS: (0, envalid_1.str)(),
    JWT_RESET_PASS_TOKEN_EXPIRES_IN: (0, envalid_1.str)(),
    RESET_PASS_LINK: (0, envalid_1.str)(),
    CLOUDINARY_CLOUD_NAME: (0, envalid_1.str)(),
    CLOUDINARY_API_KEY: (0, envalid_1.str)(),
    CLOUDINARY_API_SECRET: (0, envalid_1.str)(),
    STRIPE_SECRET_KEY: (0, envalid_1.str)(),
    STRIPE_WH_SECRET_KEY: (0, envalid_1.str)(),
    CLIENT_URL: (0, envalid_1.str)(),
});
exports.default = {
    node_env: env.NODE_ENV,
    port: env.PORT,
    database_url: env.DATABASE_URL,
    jwt_secret: env.JWT_SECRET,
    refresh_token: env.REFRESH_TOKEN,
    reset_pass_secret: env.RESET_PASS_SECRET,
    email: env.EMAIL,
    app_pass: env.APP_PASS,
    reset_pass_token_expires_in: env.JWT_RESET_PASS_TOKEN_EXPIRES_IN,
    reset_pass_link: env.RESET_PASS_LINK,
    cloudinary_cloud_name: env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: env.CLOUDINARY_API_SECRET,
    stripe_secret_key: env.STRIPE_SECRET_KEY,
    stripe_webhook_secret_key: env.STRIPE_WH_SECRET_KEY,
    client_url: env.CLIENT_URL,
};

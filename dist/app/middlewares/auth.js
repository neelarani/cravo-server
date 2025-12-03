"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const config_1 = __importDefault(require("@/config"));
const jwtHelper_1 = require("@/shared/helpers/jwtHelper");
const model_1 = require("../modules/user/model");
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies?.token || req.cookies?.accessToken;
            if (!token) {
                throw new Error('You are not authorized!');
            }
            const verifyUser = (0, jwtHelper_1.verifyToken)(token, config_1.default.jwt_secret);
            req.user = verifyUser;
            const user = await model_1.User.findOne({ email: verifyUser.email });
            if (!user)
                throw new Error('User not found');
            req.user = user;
            if (roles.length && !roles.includes(verifyUser.role)) {
                throw new Error('You are not authorized!');
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.auth = auth;

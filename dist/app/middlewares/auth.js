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
exports.auth = void 0;
const config_1 = __importDefault(require("@/config"));
const jwtHelper_1 = require("@/shared/helpers/jwtHelper");
const model_1 = require("../modules/user/model");
const auth = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token) || ((_b = req.cookies) === null || _b === void 0 ? void 0 : _b.accessToken);
            if (!token) {
                throw new Error('You are not authorized!');
            }
            const verifyUser = (0, jwtHelper_1.verifyToken)(token, config_1.default.jwt_secret);
            req.user = verifyUser;
            const user = yield model_1.User.findOne({ email: verifyUser.email });
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
    });
};
exports.auth = auth;

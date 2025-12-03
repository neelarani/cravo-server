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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.resetPassword = exports.forgotPassword = exports.logout = exports.login = void 0;
const catchAsync_1 = require("../../../shared/utils/catchAsync");
const service = __importStar(require("./service"));
const sendResponse_1 = require("../../../shared/common/sendResponse");
const httpStatusCode_1 = require("../../../shared/constants/httpStatusCode");
exports.login = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken, refreshToken, userInfo } = yield service.login(req.body);
    res.cookie('accessToken', accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60,
    });
    res.cookie('refreshToken', refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 90,
    });
    (0, sendResponse_1.sendResponse)(res, {
        status: httpStatusCode_1.HTTP_CODE.OK,
        success: true,
        message: 'User loggedin successfully!',
        data: {
            accessToken,
            refreshToken,
            user: userInfo,
        },
    });
}));
exports.logout = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 0,
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 0,
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: httpStatusCode_1.HTTP_CODE.OK,
        message: 'Logged Out',
        data: null,
    });
}));
exports.forgotPassword = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, sendResponse_1.sendResponse)(res, {
        status: httpStatusCode_1.HTTP_CODE.OK,
        success: true,
        message: 'Check your email!',
        data: yield service.forgotPassword(req.body),
    });
}));
exports.resetPassword = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, sendResponse_1.sendResponse)(res, {
        status: httpStatusCode_1.HTTP_CODE.OK,
        success: true,
        message: 'Password Reset!',
        data: yield service.resetPassword(req.query.token, req.body.password),
    });
}));
exports.getMe = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, sendResponse_1.sendResponse)(res, {
        status: httpStatusCode_1.HTTP_CODE.OK,
        success: true,
        message: 'User retrieve successfully!',
        data: yield service.getMe(req.cookies),
    });
}));

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
exports.getUserById = exports.getAllUser = exports.createUser = void 0;
const sendResponse_1 = require("@/shared/common/sendResponse");
const httpStatusCode_1 = require("@/shared/constants/httpStatusCode");
const catchAsync_1 = require("@/shared/utils/catchAsync");
const service = __importStar(require("./service"));
exports.createUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userInfo = req.body;
    const createdUser = await service.createUser(userInfo);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: httpStatusCode_1.HTTP_CODE.CREATED,
        message: `User Created Successfully!`,
        data: createdUser,
    });
});
exports.getAllUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: httpStatusCode_1.HTTP_CODE.OK,
        message: `User Retrieve Successfully!`,
        data: await service.getAllUser(),
    });
});
exports.getUserById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.params.id;
    const result = await service.getUserById(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: httpStatusCode_1.HTTP_CODE.OK,
        message: `User Retrieve Successfully!`,
        data: result,
    });
});

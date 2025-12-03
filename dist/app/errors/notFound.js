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
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const sendResponse_1 = require("@/shared/common/sendResponse");
const httpStatusCode_1 = require("@/shared/constants/httpStatusCode");
const catchAsync_1 = require("@/shared/utils/catchAsync");
exports.notFound = (0, catchAsync_1.catchAsync)((_, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        success: false,
        status: httpStatusCode_1.HTTP_CODE.NOT_FOUND,
        message: 'Route not found!',
    });
}));

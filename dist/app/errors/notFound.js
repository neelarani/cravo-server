"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const sendResponse_1 = require("@/shared/common/sendResponse");
const httpStatusCode_1 = require("@/shared/constants/httpStatusCode");
const catchAsync_1 = require("@/shared/utils/catchAsync");
exports.notFound = (0, catchAsync_1.catchAsync)(async (_, res) => {
    (0, sendResponse_1.sendResponse)(res, {
        success: false,
        status: httpStatusCode_1.HTTP_CODE.NOT_FOUND,
        message: 'Route not found!',
    });
});

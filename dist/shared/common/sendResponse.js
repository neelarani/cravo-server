"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, info) => {
    res.status(info.status).json({
        status: info.status,
        success: info.success,
        message: info.message,
        meta: info.meta,
        data: info.data,
    });
};
exports.sendResponse = sendResponse;

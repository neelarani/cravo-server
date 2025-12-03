"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const errors_1 = require("../errors");
const shared_1 = require("@/shared");
const config_1 = __importDefault(require("@/config"));
const globalErrorHandler = async (err, req, res, next) => {
    let errorSources = [];
    let status = 500;
    let message = 'Something Went Wrong!!';
    //Duplicate error
    if (err.code === 11000) {
        const simplifiedError = (0, shared_1.handlerDuplicateError)(err);
        status = simplifiedError.status;
        message = simplifiedError.message;
    }
    // Object ID error / Cast Error
    else if (err.name === 'CastError') {
        const simplifiedError = (0, shared_1.handleCastError)(err);
        status = simplifiedError.status;
        message = simplifiedError.message;
    }
    else if (err.name === 'ZodError') {
        const simplifiedError = (0, shared_1.handlerZodError)(err);
        status = simplifiedError.status;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    //Mongoose Validation Error
    else if (err.name === 'ValidationError') {
        const simplifiedError = (0, shared_1.handlerValidationError)(err);
        status = simplifiedError.status;
        errorSources = simplifiedError.errorSources;
        message = simplifiedError.message;
    }
    else if (err instanceof errors_1.AppError) {
        status = err.status;
        message = err.message;
    }
    else if (err instanceof Error) {
        status = 500;
        message = err.message;
    }
    res.status(status).json({
        success: false,
        message,
        errorSources,
        err: config_1.default.node_env === 'development'
            ? (() => {
                const { stack, ...rest } = err;
                return rest;
            })()
            : null,
        stack: config_1.default.node_env === 'development' ? err.stack?.split('\n') : null,
    });
};
exports.globalErrorHandler = globalErrorHandler;

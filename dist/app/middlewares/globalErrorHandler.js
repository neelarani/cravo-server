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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const errors_1 = require("../errors");
const shared_1 = require("@/shared");
const config_1 = __importDefault(require("@/config"));
const globalErrorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
                const { stack } = err, rest = __rest(err, ["stack"]);
                return rest;
            })()
            : null,
        stack: config_1.default.node_env === 'development' ? (_a = err.stack) === null || _a === void 0 ? void 0 : _a.split('\n') : null,
    });
});
exports.globalErrorHandler = globalErrorHandler;

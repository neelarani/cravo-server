"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (err) => {
    return {
        status: 400,
        message: 'Invalid MongoDB ObjectID. Please provide a valid id',
    };
};
exports.handleCastError = handleCastError;

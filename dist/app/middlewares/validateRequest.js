"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const catchAsync_1 = require("@/shared/utils/catchAsync");
const validateRequest = (zs) => (0, catchAsync_1.catchAsync)(async (req, _, next) => {
    req.body = await zs.parseAsync(req.body.data ? JSON.parse(req.body.data) : req.body);
    next();
});
exports.validateRequest = validateRequest;

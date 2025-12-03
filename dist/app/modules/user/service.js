"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUser = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const model_1 = require("./model");
const errors_1 = require("@/app/errors");
const httpStatusCode_1 = require("@/shared/constants/httpStatusCode");
const createUser = async (payload) => {
    const existingUser = await model_1.User.findOne({
        email: payload.email,
    });
    if (existingUser && existingUser.email === payload.email) {
        throw new errors_1.AppError(httpStatusCode_1.HTTP_CODE.BAD_REQUEST, 'User already exists with the same email!');
    }
    const hashedPassword = bcryptjs_1.default.hashSync(payload.password, bcryptjs_1.default.genSaltSync(10));
    const newUser = await model_1.User.create({
        ...payload,
        password: hashedPassword,
    });
    const { password, ...userObj } = newUser.toObject();
    return userObj;
};
exports.createUser = createUser;
const getAllUser = async () => {
    const users = await model_1.User.find({}).lean();
    if (!users)
        throw new Error('User not found');
    const usersWithoutPassword = users.map(({ password, ...user }) => user);
    return usersWithoutPassword;
};
exports.getAllUser = getAllUser;
const getUserById = async (id) => {
    const user = await model_1.User.findOne({ _id: id }).lean();
    if (!user)
        throw new errors_1.AppError(httpStatusCode_1.HTTP_CODE.NOT_FOUND, 'User not found');
    const { password, ...userObj } = user;
    return userObj;
};
exports.getUserById = getUserById;

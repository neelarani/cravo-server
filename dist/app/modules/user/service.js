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
exports.getUserById = exports.getAllUser = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const model_1 = require("./model");
const errors_1 = require("@/app/errors");
const httpStatusCode_1 = require("@/shared/constants/httpStatusCode");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield model_1.User.findOne({
        email: payload.email,
    });
    if (existingUser && existingUser.email === payload.email) {
        throw new errors_1.AppError(httpStatusCode_1.HTTP_CODE.BAD_REQUEST, 'User already exists with the same email!');
    }
    const hashedPassword = bcryptjs_1.default.hashSync(payload.password, bcryptjs_1.default.genSaltSync(10));
    const newUser = yield model_1.User.create(Object.assign(Object.assign({}, payload), { password: hashedPassword }));
    const _a = newUser.toObject(), { password } = _a, userObj = __rest(_a, ["password"]);
    return userObj;
});
exports.createUser = createUser;
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield model_1.User.find({}).lean();
    if (!users)
        throw new Error('User not found');
    const usersWithoutPassword = users.map((_a) => {
        var { password } = _a, user = __rest(_a, ["password"]);
        return user;
    });
    return usersWithoutPassword;
});
exports.getAllUser = getAllUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_1.User.findOne({ _id: id }).lean();
    if (!user)
        throw new errors_1.AppError(httpStatusCode_1.HTTP_CODE.NOT_FOUND, 'User not found');
    const { password } = user, userObj = __rest(user, ["password"]);
    return userObj;
});
exports.getUserById = getUserById;

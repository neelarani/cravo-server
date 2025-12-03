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
exports.getMe = exports.resetPassword = exports.forgotPassword = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const model_1 = require("../user/model");
const httpStatusCode_1 = require("@/shared/constants/httpStatusCode");
const errors_1 = require("@/app/errors");
const jwtHelper_1 = require("@/shared/helpers/jwtHelper");
const config_1 = __importDefault(require("@/config"));
const shared_1 = require("@/shared");
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_1.User.findOne({
        email: payload.email,
    })
        .select('+password')
        .lean();
    if (!user) {
        throw new errors_1.AppError(httpStatusCode_1.HTTP_CODE.NOT_FOUND, 'User not found');
    }
    const isCorrectPassword = yield bcryptjs_1.default.compare(payload.password, user.password);
    if (!isCorrectPassword)
        throw new errors_1.AppError(httpStatusCode_1.HTTP_CODE.BAD_REQUEST, 'Password is incorrect!');
    const accessToken = (0, jwtHelper_1.generateToken)({ email: user.email, role: user.role }, config_1.default.jwt_secret, '24h');
    const refreshToken = (0, jwtHelper_1.generateToken)({ email: user.email, role: user.role }, config_1.default.refresh_token, '90d');
    const { password } = user, userInfo = __rest(user, ["password"]);
    return {
        accessToken,
        refreshToken,
        userInfo,
    };
});
exports.login = login;
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield model_1.User.findOne({
        email: payload.email,
    }).lean();
    if (!userData) {
        throw new errors_1.AppError(httpStatusCode_1.HTTP_CODE.NOT_FOUND, 'User not found!');
    }
    const resetPassToken = (0, jwtHelper_1.generateToken)({
        userId: userData._id,
    }, config_1.default.reset_pass_secret, config_1.default.reset_pass_token_expires_in);
    const resetPassLink = config_1.default.reset_pass_link + `?token=${resetPassToken}`;
    yield (0, shared_1.emailSender)(userData.email, `
        <div>
            <p>Dear User,</p>
            <p>Your password reset link 
                <a href=${resetPassLink}>
                    <button>
                        Reset Password
                    </button>
                </a>
            </p>

        </div>
        `);
});
exports.forgotPassword = forgotPassword;
const resetPassword = (token, password) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = (0, jwtHelper_1.verifyToken)(token, config_1.default.reset_pass_secret);
    const user = yield model_1.User.findById(userId);
    if (!user)
        throw new errors_1.AppError(httpStatusCode_1.HTTP_CODE.BAD_REQUEST, 'User not found!');
    const hasPassword = bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync(10));
    yield model_1.User.findByIdAndUpdate(userId, { password: hasPassword }, { runValidators: true });
});
exports.resetPassword = resetPassword;
const getMe = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = user.accessToken;
    if (!accessToken) {
        throw new errors_1.AppError(httpStatusCode_1.HTTP_CODE.UNAUTHORIZED, 'Not authenticated');
    }
    const decodedData = (0, jwtHelper_1.verifyToken)(accessToken, config_1.default.jwt_secret);
    const userData = yield model_1.User.findOne({ email: decodedData.email }).lean();
    if (!userData) {
        throw new errors_1.AppError(httpStatusCode_1.HTTP_CODE.NOT_FOUND, 'User not found');
    }
    return userData;
});
exports.getMe = getMe;

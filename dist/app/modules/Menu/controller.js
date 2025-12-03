"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.getCategoriesController = exports.deleteMenu = exports.updateMenu = exports.getSingleMenu = exports.getAllMenu = exports.createMenu = void 0;
const catchAsync_1 = require("@/shared/utils/catchAsync");
const service = __importStar(require("./service"));
const sendResponse_1 = require("@/shared/common/sendResponse");
const httpStatusCode_1 = require("@/shared/constants/httpStatusCode");
exports.createMenu = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menu = req.body;
    const createdMenu = yield service.createMenu(menu, req.file);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: httpStatusCode_1.HTTP_CODE.CREATED,
        message: `Menu Created Successfully!`,
        data: createdMenu,
    });
}));
// GET ALL
exports.getAllMenu = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menus = yield service.getAllMenu();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: httpStatusCode_1.HTTP_CODE.OK,
        message: `Menu fetched successfully!`,
        data: menus,
    });
}));
// GET SINGLE
exports.getSingleMenu = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const menu = yield service.getSingleMenu(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: httpStatusCode_1.HTTP_CODE.OK,
        message: `Menu fetched successfully!`,
        data: menu,
    });
}));
// UPDATE
exports.updateMenu = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedMenu = yield service.updateMenu(id, req.body, req.file);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: httpStatusCode_1.HTTP_CODE.OK,
        message: `Menu Updated Successfully!`,
        data: updatedMenu,
    });
}));
// DELETE
exports.deleteMenu = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedMenu = yield service.deleteMenu(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: httpStatusCode_1.HTTP_CODE.OK,
        message: `Menu Deleted Successfully!`,
        data: deletedMenu,
    });
}));
exports.getCategoriesController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield service.getCategories();
    console.log(categories);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: httpStatusCode_1.HTTP_CODE.OK,
        message: 'Categories fetched successfully',
        data: ['All Items', ...categories],
    });
}));

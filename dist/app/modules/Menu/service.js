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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.deleteMenu = exports.updateMenu = exports.getSingleMenu = exports.getAllMenu = exports.createMenu = void 0;
const shared_1 = require("@/shared");
const model_1 = require("./model");
const createMenu = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const uploadResult = yield shared_1.fileUploader.uploadToCloudinary(file);
        payload.img = uploadResult === null || uploadResult === void 0 ? void 0 : uploadResult.secure_url;
    }
    const menu = yield model_1.FoodItem.create({
        name: payload.name,
        title: payload.title,
        price: payload.price,
        img: payload.img,
        description: payload.description,
        category: payload.category,
    });
    return menu;
});
exports.createMenu = createMenu;
// GET ALL MENU
const getAllMenu = () => __awaiter(void 0, void 0, void 0, function* () {
    const menus = yield model_1.FoodItem.find();
    return menus;
});
exports.getAllMenu = getAllMenu;
// GET SINGLE MENU
const getSingleMenu = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const menu = yield model_1.FoodItem.findById(id);
    return menu;
});
exports.getSingleMenu = getSingleMenu;
// UPDATE MENU
const updateMenu = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    let updatedData = Object.assign({}, payload);
    // If new image uploaded
    if (file) {
        const uploaded = yield shared_1.fileUploader.uploadToCloudinary(file);
        updatedData.img = uploaded === null || uploaded === void 0 ? void 0 : uploaded.secure_url;
    }
    const updatedMenu = yield model_1.FoodItem.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    });
    return updatedMenu;
});
exports.updateMenu = updateMenu;
// DELETE MENU
const deleteMenu = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedMenu = yield model_1.FoodItem.findByIdAndDelete(id);
    return deletedMenu;
});
exports.deleteMenu = deleteMenu;
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield model_1.FoodItem.distinct('category');
    return categories;
});
exports.getCategories = getCategories;

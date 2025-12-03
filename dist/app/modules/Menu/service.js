"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.deleteMenu = exports.updateMenu = exports.getSingleMenu = exports.getAllMenu = exports.createMenu = void 0;
const shared_1 = require("@/shared");
const model_1 = require("./model");
const createMenu = async (payload, file) => {
    if (file) {
        const uploadResult = await shared_1.fileUploader.uploadToCloudinary(file);
        payload.img = uploadResult?.secure_url;
    }
    const menu = await model_1.FoodItem.create({
        name: payload.name,
        title: payload.title,
        price: payload.price,
        img: payload.img,
        description: payload.description,
        category: payload.category,
    });
    return menu;
};
exports.createMenu = createMenu;
// GET ALL MENU
const getAllMenu = async () => {
    const menus = await model_1.FoodItem.find();
    return menus;
};
exports.getAllMenu = getAllMenu;
// GET SINGLE MENU
const getSingleMenu = async (id) => {
    const menu = await model_1.FoodItem.findById(id);
    return menu;
};
exports.getSingleMenu = getSingleMenu;
// UPDATE MENU
const updateMenu = async (id, payload, file) => {
    let updatedData = { ...payload };
    // If new image uploaded
    if (file) {
        const uploaded = await shared_1.fileUploader.uploadToCloudinary(file);
        updatedData.img = uploaded?.secure_url;
    }
    const updatedMenu = await model_1.FoodItem.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    });
    return updatedMenu;
};
exports.updateMenu = updateMenu;
// DELETE MENU
const deleteMenu = async (id) => {
    const deletedMenu = await model_1.FoodItem.findByIdAndDelete(id);
    return deletedMenu;
};
exports.deleteMenu = deleteMenu;
const getCategories = async () => {
    const categories = await model_1.FoodItem.distinct('category');
    return categories;
};
exports.getCategories = getCategories;

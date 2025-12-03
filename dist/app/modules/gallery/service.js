"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGallery = exports.createGallery = void 0;
const shared_1 = require("@/shared");
const model_1 = __importDefault(require("./model"));
const createGallery = async (payload, file) => {
    if (file) {
        const uploadResult = await shared_1.fileUploader.uploadToCloudinary(file);
        payload.img = uploadResult?.secure_url;
    }
    const gallery = await model_1.default.create({
        title: payload.title,
        img: payload.img,
        description: payload.description,
        category: payload.category,
    });
    return gallery;
};
exports.createGallery = createGallery;
// GET ALL MENU
const getAllGallery = async () => {
    const gallery = await model_1.default.find();
    return gallery;
};
exports.getAllGallery = getAllGallery;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGallery = exports.createGallery = void 0;
const shared_1 = require("../../../shared");
const model_1 = __importDefault(require("./model"));
const createGallery = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const uploadResult = yield shared_1.fileUploader.uploadToCloudinary(file);
        payload.img = uploadResult === null || uploadResult === void 0 ? void 0 : uploadResult.secure_url;
    }
    const gallery = yield model_1.default.create({
        title: payload.title,
        img: payload.img,
        description: payload.description,
        category: payload.category,
    });
    return gallery;
});
exports.createGallery = createGallery;
// GET ALL MENU
const getAllGallery = () => __awaiter(void 0, void 0, void 0, function* () {
    const gallery = yield model_1.default.find();
    return gallery;
});
exports.getAllGallery = getAllGallery;

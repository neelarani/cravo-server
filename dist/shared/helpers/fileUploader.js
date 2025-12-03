"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const parser_1 = __importDefault(require("datauri/parser"));
const config_1 = __importDefault(require("@/config"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
const parser = new parser_1.default();
const ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'video/mp4',
    'application/pdf',
];
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype))
            return cb(new Error(`Unsupported file type: ${file.mimetype}`));
        cb(null, true);
    },
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});
const uploadToCloudinary = async (file) => {
    if (!file) {
        throw new Error('Failed to upload file!');
    }
    const { content } = parser.format(file.originalname, file.buffer);
    if (!content) {
        throw new Error('cloudinary err: Server side err!');
    }
    const uploadResult = await cloudinary_1.v2.uploader
        .upload(content, {
        public_id: file.originalname,
    })
        .catch((err) => {
        console.log(err);
    });
    return uploadResult;
};
exports.uploadToCloudinary = uploadToCloudinary;

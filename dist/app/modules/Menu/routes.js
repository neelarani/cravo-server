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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = __importStar(require("./controller"));
const auth_1 = require("../../../app/middlewares/auth");
const interface_1 = require("../user/interface");
const shared_1 = require("../../../shared");
const validateRequest_1 = require("../../../app/middlewares/validateRequest");
const validation = __importStar(require("./validation"));
const router = (0, express_1.Router)();
router.post('/create-menu', (0, auth_1.auth)(interface_1.Role.ADMIN, interface_1.Role.SUPPER_ADMIN), shared_1.fileUploader.upload.single('file'), (0, validateRequest_1.validateRequest)(validation.foodItemSchema), controller.createMenu);
router.get('/', controller.getAllMenu);
router.get('/:id', controller.getSingleMenu);
router.patch('/:id', shared_1.fileUploader.upload.single('file'), (0, validateRequest_1.validateRequest)(validation.foodItemUpdateSchema), controller.updateMenu);
router.delete('/:id', (0, auth_1.auth)(interface_1.Role.ADMIN, interface_1.Role.SUPPER_ADMIN), controller.deleteMenu);
router.get('/categories', controller.getCategoriesController);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = exports.orderRoutes = exports.galleryRoutes = exports.menuRoutes = exports.authRoutes = exports.userRoutes = void 0;
var route_1 = require("./user/route");
Object.defineProperty(exports, "userRoutes", { enumerable: true, get: function () { return __importDefault(route_1).default; } });
var route_2 = require("./auth/route");
Object.defineProperty(exports, "authRoutes", { enumerable: true, get: function () { return __importDefault(route_2).default; } });
var routes_1 = require("./Menu/routes");
Object.defineProperty(exports, "menuRoutes", { enumerable: true, get: function () { return __importDefault(routes_1).default; } });
var routes_2 = require("./gallery/routes");
Object.defineProperty(exports, "galleryRoutes", { enumerable: true, get: function () { return __importDefault(routes_2).default; } });
var route_3 = require("./order/route");
Object.defineProperty(exports, "orderRoutes", { enumerable: true, get: function () { return __importDefault(route_3).default; } });
var routes_3 = require("./payment/routes");
Object.defineProperty(exports, "paymentRoutes", { enumerable: true, get: function () { return __importDefault(routes_3).default; } });

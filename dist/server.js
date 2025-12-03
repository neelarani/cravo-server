"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
async function main() {
    try {
        await mongoose_1.default.connect(`${config_1.default.database_url}`);
        app_1.default.listen(config_1.default.port, () => {
            console.log(`cravo server port is:  ${config_1.default.port}`);
        });
    }
    catch (err) {
        console.log(err);
    }
}
main();

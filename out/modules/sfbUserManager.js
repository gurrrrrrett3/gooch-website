"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class SfbUserManager {
    static getUser(userID) {
        const userPath = path_1.default.resolve(`data/sfb/users/${userID}.json`);
        if (fs_1.default.existsSync(userPath)) {
            return JSON.parse(fs_1.default.readFileSync(userPath, "utf8"));
        }
        else {
            return undefined;
        }
    }
}
exports.default = SfbUserManager;

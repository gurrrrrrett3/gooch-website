"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pageUtils_1 = __importDefault(require("./pageUtils"));
class UserPageBuilder {
    static Build(data) {
        return pageUtils_1.default.buildPage("userPage", {
            Username: data.username,
            Avatar: data.avatar,
            ID: data.id
        });
    }
}
exports.default = UserPageBuilder;

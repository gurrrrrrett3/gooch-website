"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class PageUtils {
    static generatePage(input, replace) {
        let output = input;
        Object.keys(replace).forEach(key => {
            const regex = new RegExp(`%%${key}`, "g");
            console.log(regex);
            output = output.replace(regex, replace[key]);
        });
        return output;
    }
    static buildPage(template, data) {
        const page = fs_1.default.readFileSync(path_1.default.resolve("./modules/pageBuilders/templates/" + template + ".html"), "utf8");
        return this.generatePage(page, data);
    }
}
exports.default = PageUtils;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_size_1 = __importDefault(require("image-size"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class sfbTextureValidator {
    static validate(code) {
        const texturePath = path_1.default.resolve(`data/images/${code}.png`);
        if (fs_1.default.existsSync(texturePath)) {
            const dimensions = (0, image_size_1.default)(texturePath);
            if (!dimensions.width || !dimensions.height)
                return false;
            if (dimensions.width != 16 || dimensions.height != 16) {
                return false;
            }
            return true;
        }
        else
            return false;
    }
}
exports.default = sfbTextureValidator;

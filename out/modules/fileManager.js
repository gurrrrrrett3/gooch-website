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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const sfbTextureValidator_1 = __importDefault(require("./sfbTextureValidator"));
const sfbUserManager_1 = __importDefault(require("./sfbUserManager"));
class FileManager {
    static manageUpload(code, data) {
        this.checkForFolders();
        const fileData = {
            code: code,
            username: data.username,
            ip: data.ip,
            item: data.itemName,
            date: Date.now(),
        };
        if (!sfbTextureValidator_1.default.validate(code)) {
            return {
                success: false,
                message: "Invalid texture, image needs to be 16x16.",
            };
        }
        fs_1.default.writeFileSync(path_1.default.resolve(`data/info/${code}.json`), JSON.stringify(fileData));
        fs_1.default.copyFile(path_1.default.resolve(`temp/${code}.png`), path_1.default.resolve(`data/images/${code}.png`), (err) => {
            if (err) {
                console.error(err);
            }
            else {
                fs_1.default.unlinkSync(path_1.default.resolve(`temp/${code}.png`));
            }
        });
        return {
            success: true,
            message: `File uploaded! Code: ${code}`,
        };
    }
    static manageBotUpload(code, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data);
            const response = yield (0, node_fetch_1.default)(data.url);
            const buffer = yield response.arrayBuffer();
            const file = Buffer.from(buffer);
            fs_1.default.writeFileSync(path_1.default.resolve(`temp/${code}.png`), file);
            const user = sfbUserManager_1.default.getUser(data.id);
            if (!user)
                return {
                    success: false,
                    message: "User not found",
                };
            return this.manageUpload(code, {
                username: user.username,
                itemName: data.itemName,
                ip: "DISCORD",
            });
        });
    }
    static checkForFolders() {
        if (!fs_1.default.existsSync(path_1.default.resolve("data"))) {
            fs_1.default.mkdirSync(path_1.default.resolve("data"));
        }
        if (!fs_1.default.existsSync(path_1.default.resolve("data/info"))) {
            fs_1.default.mkdirSync(path_1.default.resolve("data/info"));
        }
        if (!fs_1.default.existsSync(path_1.default.resolve("data/images"))) {
            fs_1.default.mkdirSync(path_1.default.resolve("data/images"));
        }
    }
}
exports.default = FileManager;

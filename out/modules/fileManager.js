"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FileManager {
    static manageUpload(code, data) {
        this.checkForFolders();
        const fileData = {
            code: code,
            username: data.username,
            ip: data.ip,
            item: data.itemName,
            date: Date.now()
        };
        fs_1.default.writeFileSync(path_1.default.resolve(`data/info/${code}.json`), JSON.stringify(fileData));
        fs_1.default.copyFile(path_1.default.resolve(`temp/${code}.png`), path_1.default.resolve(`data/images/${code}.png`), (err) => {
            if (err) {
                console.error(err);
            }
            else {
                fs_1.default.unlinkSync(path_1.default.resolve(`temp/${code}.png`));
            }
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("./user"));
class default_1 extends user_1.default {
    constructor(user, mcUsername, lastUpload) {
        super(user.id, user.username, user.avatar);
        this.mcUsername = mcUsername;
        this.lastUpload = lastUpload;
    }
    save() {
        const filePath = path_1.default.resolve(`data/sfb/users/${this.id}.json`);
    }
    static getUser(id) {
        if (fs_1.default.existsSync(`./data/sfb/users/${id}.json`)) {
            return JSON.parse(fs_1.default.readFileSync(`./data/sfb/users/${id}.json`, "utf8"));
        }
        else {
            return undefined;
        }
    }
}
exports.default = default_1;

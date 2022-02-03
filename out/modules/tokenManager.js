"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class TokenManager {
    static storeToken(data) {
        data.expires_in = Date.now() + (data.expires_in * 1000);
        const tokens = this.openFile();
        const index = tokens.findIndex(token => token.access_token === data.access_token);
        if (index > -1) {
            tokens[index] = data;
        }
        else {
            tokens.push(data);
        }
        this.saveFile(tokens);
    }
    static openFile() {
        return JSON.parse(fs_1.default.readFileSync("./data/auth/tokens.json", "utf8"));
    }
    static saveFile(data) {
        fs_1.default.writeFileSync("./data/auth/tokens.json", JSON.stringify(data));
    }
}
exports.default = TokenManager;

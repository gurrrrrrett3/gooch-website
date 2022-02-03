"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class StateManager {
    static genSatate() {
        const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const data = this.openFile();
        data.push(state);
        this.saveFile(data);
        return state;
    }
    static checkState(state) {
        const data = this.openFile();
        const index = data.indexOf(state);
        if (index > -1) {
            data.splice(index, 1);
            this.saveFile(data);
            return true;
        }
        return false;
    }
    static openFile() {
        return JSON.parse(fs_1.default.readFileSync("./data/auth/states.json", "utf8"));
    }
    static saveFile(data) {
        fs_1.default.writeFileSync("./data/auth/states.json", JSON.stringify(data));
    }
}
exports.default = StateManager;

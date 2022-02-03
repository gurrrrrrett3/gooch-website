"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stateManager_1 = __importDefault(require("./stateManager"));
class Util {
    static genCode() {
        //generate a random 6 character (A-Z) string
        let code = "";
        for (let i = 0; i < 6; i++) {
            code += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        }
        return code;
    }
    static buildDiscordAuthURL(clientID, redirectURI, scope) {
        const state = stateManager_1.default.genSatate();
        return `https://discordapp.com/api/oauth2/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=${scope}&state=${state}`;
    }
}
exports.default = Util;

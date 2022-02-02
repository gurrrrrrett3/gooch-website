"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Util {
    static genCode() {
        //generate a random 6 character (A-Z) string
        let code = "";
        for (let i = 0; i < 6; i++) {
            code += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        }
        return code;
    }
}
exports.default = Util;

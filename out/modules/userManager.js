"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const user_1 = __importDefault(require("./user"));
const auth_json_1 = __importDefault(require("../auth.json"));
const tokenManager_1 = __importDefault(require("./tokenManager"));
const node_fetch_1 = __importDefault(require("node-fetch"));
class UserManager {
    static authUser(code) {
        return new Promise((resolve, reject) => {
            const data = {
                client_id: auth_json_1.default.discord.CLIENT_ID,
                client_secret: auth_json_1.default.discord.CLIENT_SECRET,
                grant_type: "authorization_code",
                code: code,
                redirect_uri: auth_json_1.default.discord.REDIRECT_URI,
            };
            (0, node_fetch_1.default)(`https://discordapp.com/api/oauth2/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams(data).toString(),
            })
                .then((res) => res.json())
                .then((json) => {
                if (json.access_token) {
                    tokenManager_1.default.storeToken(json);
                    (0, node_fetch_1.default)(`https://discordapp.com/api/users/@me`, {
                        headers: {
                            Authorization: `Bearer ${json.access_token}`,
                        },
                    })
                        .then((res) => res.json())
                        .then((json) => {
                        let user = new user_1.default(json.id, json.username, json.avatar);
                        UserManager.saveUser(user);
                        resolve(user);
                    })
                        .catch((err) => reject(err));
                }
                else {
                    reject(json);
                }
            });
        });
    }
    static getUser(id) {
        if (fs_1.default.existsSync(`./data/users/${id}.json`)) {
            return JSON.parse(fs_1.default.readFileSync(`./data/users/${id}.json`, "utf8"));
        }
        else {
            return undefined;
        }
    }
    static saveUser(user) {
        fs_1.default.writeFileSync(`./data/users/${user.id}.json`, JSON.stringify(user));
    }
}
exports.default = UserManager;

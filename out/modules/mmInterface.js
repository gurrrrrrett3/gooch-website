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
const mmFetch_1 = __importDefault(require("./mmFetch"));
const mmLeaderboard_1 = __importDefault(require("./mmLeaderboard"));
class mmInterface {
    static formatPlanDate(date) {
        const dateArr = date.split(" ");
        const cleanDateArr = dateArr.map((date) => {
            return parseInt(date.replace(/\D/g, ""));
        });
        const length = dateArr.length;
        let time = 0;
        let sec = cleanDateArr[length - 1];
        let min = cleanDateArr[length - 2];
        let hour = cleanDateArr[length - 3];
        let day = cleanDateArr[length - 4];
        if (day)
            time += day * 24 * 60 * 60;
        if (hour)
            time += hour * 60 * 60;
        if (min)
            time += min * 60;
        if (sec)
            time += sec;
        return time;
    }
    static generatePlayerList() { }
    static getPlayer(playerName) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield mmFetch_1.default.fetch({
                endpoint: "player",
                player: playerName,
            });
            return data;
        });
    }
    static getOnlineSessons() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (yield mmFetch_1.default.fetch({
                endpoint: "sessions",
                timestamp: Date.now(),
            }));
            let out = [];
            data.sessions.forEach((session) => {
                if (session.start.includes("Online")) {
                    out.push(session);
                }
            });
            return out;
        });
    }
    static getLeaderboard(type) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (type) {
                case "playtime":
                    return yield mmLeaderboard_1.default.totalPlaytime();
                case "mobkills":
                    return yield mmLeaderboard_1.default.totalMobKills();
                default:
                    return null;
            }
        });
    }
}
exports.default = mmInterface;

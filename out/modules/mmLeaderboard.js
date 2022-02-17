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
const node_html_parser_1 = __importDefault(require("node-html-parser"));
const mmInterface_1 = __importDefault(require("./mmInterface"));
class mmLeaderboard {
    static totalPlaytime() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (yield mmFetch_1.default.fetch({
                endpoint: "players",
                timestamp: Date.now(),
            }));
            let out = [];
            let sortedData = data.data.sort((a, b) => {
                return mmInterface_1.default.formatPlanDate(b.activePlaytime.d) - mmInterface_1.default.formatPlanDate(a.activePlaytime.d);
            });
            sortedData = sortedData.slice(0, 10);
            sortedData.forEach((player) => {
                out.push({
                    name: (0, node_html_parser_1.default)(player.name).childNodes[0].rawText,
                    playtime: parseInt(player.activePlaytime.v),
                    f_playtime: player.activePlaytime.d,
                });
            });
            return out;
        });
    }
    static totalMobKills() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = (yield mmFetch_1.default.fetch({
                endpoint: "players",
                timestamp: Date.now(),
            }));
            //only get the top 50 users by playtime, to avoid spamming the server with hundreds of requests
            let sortedPlaytimeData = data.data.sort((a, b) => {
                return mmInterface_1.default.formatPlanDate(b.activePlaytime.d) - mmInterface_1.default.formatPlanDate(a.activePlaytime.d);
            });
            sortedPlaytimeData = sortedPlaytimeData.slice(0, 50);
            let out = [];
            sortedPlaytimeData.forEach((player) => __awaiter(this, void 0, void 0, function* () {
                const playername = (0, node_html_parser_1.default)(player.name).childNodes[0].rawText;
                mmInterface_1.default.getPlayer(playername).then((playerData) => __awaiter(this, void 0, void 0, function* () {
                    const mobKills = playerData.kill_data.mob_deaths_total;
                    out.push({
                        name: playername,
                        mobKills: mobKills,
                    });
                }));
            }));
            out.sort((a, b) => {
                return b.mobKills - a.mobKills;
            });
            return out;
        });
    }
}
exports.default = mmLeaderboard;

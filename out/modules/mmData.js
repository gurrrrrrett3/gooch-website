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
const mmInterface_1 = __importDefault(require("./mmInterface"));
class mmPings {
    constructor() {
        this.data = {
            afk: [],
        };
        this.oldData = {
            afk: [],
        };
        this.interval = setInterval(() => {
            this.update();
            console.log(this.getAFKList());
        }, 5000);
        return this;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            this.oldData.afk = this.data.afk;
            this.data.afk = [];
            const data = yield mmInterface_1.default.getOnlineSessons();
            data.forEach((session) => {
                this.data.afk.push({
                    player: session.name,
                    time: mmPings.formatPlanDate(session.afk_time),
                });
            });
            console.log(this.data.afk);
            console.log(this.oldData.afk);
        });
    }
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
    getAFKList() {
        let list = [];
        let out = [];
        this.data.afk.forEach((player, index) => {
            if (player.time > this.oldData.afk[index].time) {
                list.push(player.player);
            }
        });
        this.data.afk.forEach((player) => {
            out.push({
                name: player.player,
                afk: list.includes(player.player) ? "AFK" : "Online",
            });
        });
        console.log(list);
        return out;
    }
}
exports.default = mmPings;

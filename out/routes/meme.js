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
const express_1 = require("express");
const canvas_1 = __importDefault(require("canvas"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.get("/ip", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const qs = req.query;
    const lines = [qs.a, qs.b, qs.c, qs.d, qs.e, qs.f, qs.g, qs.h, qs.i, qs.j, qs.k, qs.l, qs.m, qs.n, qs.o, qs.p, qs.q, qs.r, qs.s, qs.t, qs.u, qs.v, qs.w, qs.x, qs.y, qs.z].map((v) => v === null || v === void 0 ? void 0 : v.toString());
    let cleanLines = lines.filter((v) => v != undefined);
    if (cleanLines.length == 0) {
        cleanLines = [req.ip];
    }
    console.log(cleanLines);
    //@ts-ignore
    const buf = yield renderIPImage(...cleanLines);
    res.setHeader("Content-Type", "image/png");
    res.send(buf);
}));
router.get("/ip/:ip", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const buf = yield renderIPImage(req.params.ip);
    res.setHeader('Content-Type', 'image/png');
    res.send(buf);
}));
function renderIPImage(...lines) {
    return __awaiter(this, void 0, void 0, function* () {
        const canvas = new canvas_1.default.Canvas(1248, 720);
        const ctx = canvas.getContext("2d");
        const img = yield canvas_1.default.loadImage(path_1.default.resolve("./assets/png/intruder.png"));
        ctx.drawImage(img, 0, 0);
        ctx.font = "48px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("nice argument", 150, 250);
        ctx.fillText(`but ${lines[0]}`, 150, 300);
        let y = 350;
        for (let i = 1; i < lines.length; i++) {
            ctx.fillText(lines[i], 150, y);
            y += 50;
        }
        const buf = canvas.toBuffer();
        return buf;
    });
}
exports.default = router;

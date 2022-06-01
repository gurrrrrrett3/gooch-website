"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const assets_1 = __importDefault(require("./assets"));
const plethora_1 = __importDefault(require("./plethora"));
const sfb_1 = __importDefault(require("./sfb"));
const api_1 = __importDefault(require("./api"));
const user_1 = __importDefault(require("./user"));
const qr_1 = __importDefault(require("./qr"));
const meme_1 = __importDefault(require("./meme"));
let router = (0, express_1.Router)();
router.use("/assets", assets_1.default);
router.use("/plethora", plethora_1.default);
router.use("/sfb", sfb_1.default);
router.use("/api", api_1.default);
router.use("/user", user_1.default);
router.use("/qr", qr_1.default);
router.use("/meme", meme_1.default);
router.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve("./assets/html/index.html"));
});
router.get("/skyblock", (req, res) => {
    res.sendFile(path_1.default.resolve("./assets/html/skyblock.html"));
});
router.get("/appeal", (req, res) => {
    res.sendFile(path_1.default.resolve("./assets/html/appeal.html"));
    //res.redirect("/assets/local/mp3/connection")
});
router.get("/goat", (req, res) => {
    res.redirect("https://goatse.ru");
});
router.get("/policy", (req, res) => {
    res.sendFile(path_1.default.resolve("./assets/html/policy.html"));
});
router.get("/contact", (req, res) => {
    res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});
router.get("/url/6ffde4", (req, res) => {
    res.redirect("https://stopify.co/1KW1R7");
});
exports.default = router;

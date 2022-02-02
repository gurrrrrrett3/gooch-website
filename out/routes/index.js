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
let router = (0, express_1.Router)();
router.use("/assets", assets_1.default);
router.use("/plethora", plethora_1.default);
router.use("/sfb", sfb_1.default);
router.use("/api", api_1.default);
router.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve("./assets/html/index.html"));
});
router.get("/skyblock", (req, res) => {
    res.sendFile(path_1.default.resolve("./assets/html/skyblock.html"));
});
exports.default = router;

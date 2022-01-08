"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const assets_1 = __importDefault(require("./assets"));
let router = (0, express_1.Router)();
router.use("/assets", assets_1.default);
router.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve("./assets/html/index.html"));
});
exports.default = router;
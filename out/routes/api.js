"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const api_sfb_1 = __importDefault(require("./api-sfb"));
const auth_1 = __importDefault(require("./auth"));
const api_mm_1 = __importDefault(require("./mm/api-mm"));
const router = (0, express_1.Router)();
router.use("/sfb", api_sfb_1.default);
router.use("/auth", auth_1.default);
router.use("/mm", api_mm_1.default);
router.get("/img/:code", (req, res) => {
    const filePath = path_1.default.resolve(`./data/images/${req.params.code.toUpperCase()}.png`);
    if (fs_1.default.existsSync(filePath)) {
        res.sendFile(filePath);
    }
    else {
        res.status(404).send({
            success: false,
            error: "File not found"
        });
    }
});
router.get("/image/:code", (req, res) => {
    res.redirect(`/api/img/${req.params.code}`);
});
exports.default = router;

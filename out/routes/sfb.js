"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fuzzyset_1 = __importDefault(require("fuzzyset"));
const items_json_1 = __importDefault(require("../assets/groups/sfb/json/items.json"));
const fuzzy = (0, fuzzyset_1.default)();
items_json_1.default.forEach((item) => {
    fuzzy.add(item);
});
const router = (0, express_1.Router)();
router.get("/upload", (req, res) => {
    res.sendFile(path_1.default.resolve('./assets/html/upload.html'));
});
router.get("/fuzzy/:query", (req, res) => {
    const query = req.params.query;
    res.send(fuzzy.get(query));
});
exports.default = router;

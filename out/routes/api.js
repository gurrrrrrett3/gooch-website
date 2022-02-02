"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_sfb_1 = __importDefault(require("./api-sfb"));
const router = (0, express_1.Router)();
router.use("/sfb", api_sfb_1.default);
exports.default = router;

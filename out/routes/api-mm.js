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
const path_1 = __importDefault(require("path"));
const mmFetch_1 = __importDefault(require("../modules/mmFetch"));
const mmInterface_1 = __importDefault(require("../modules/mmInterface"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendFile(path_1.default.resolve(`./assets/groups/mm/html/index.html`));
}));
router.get("/onlinelist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield mmFetch_1.default.fetch({
        endpoint: "overview",
        timestamp: Date.now()
    });
    res.send(data);
}));
router.get("/player/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield mmInterface_1.default.getPlayer(req.params.username);
    res.send(data);
}));
exports.default = router;

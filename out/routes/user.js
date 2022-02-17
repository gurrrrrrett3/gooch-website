"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userManager_1 = __importDefault(require("../modules/userManager"));
const userPage_1 = __importDefault(require("../modules/pageBuilders/userPage"));
const router = (0, express_1.Router)();
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const user = userManager_1.default.getUser(id);
    if (!user) {
        res.status(404).send("User not found");
        return;
    }
    res.send(userPage_1.default.Build(user));
});
router.get("/:id/settings", (req, res) => {
});
exports.default = router;

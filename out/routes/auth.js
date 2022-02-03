"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stateManager_1 = __importDefault(require("../modules/stateManager"));
const userManager_1 = __importDefault(require("../modules/userManager"));
const util_1 = __importDefault(require("../modules/util"));
const auth_json_1 = __importDefault(require("../auth.json"));
const router = (0, express_1.Router)();
router.get("/login", (req, res) => {
    res.redirect(util_1.default.buildDiscordAuthURL(auth_json_1.default.discord.CLIENT_ID, auth_json_1.default.discord.REDIRECT_URI, auth_json_1.default.discord.SCOPE));
});
router.get('/callback', (req, res) => {
    const code = req.query.code;
    const state = req.query.state;
    if (!code || !state) {
        res.send("Error: No code or state");
        return;
    }
    if (stateManager_1.default.checkState(state.toString())) {
        userManager_1.default.authUser(code.toString()).then(user => {
            res.redirect(`/user/${user.id}/settings`);
        }).catch(err => {
            res.status(500).json(err);
        });
    }
    else {
        res.send("Error: Invalid state, you may have been redirected here by a third party site. Please try again.");
    }
});
exports.default = router;

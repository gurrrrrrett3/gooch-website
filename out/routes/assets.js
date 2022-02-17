"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const config_json_1 = __importDefault(require("../config.json"));
let router = (0, express_1.Router)();
router.get("/local/:type/:name", (req, res) => {
    let type = req.params.type;
    let name = req.params.name;
    if (name.includes(".css.map")) {
        res.sendFile(path_1.default.resolve(`./assets/map/${name}`));
    }
    else {
        res.sendFile(path_1.default.resolve(`./assets/${type}/${name}.${type}`));
    }
});
router.get("/local/font/:type/:name", (req, res) => {
    let type = req.params.type == "1" ? "" : "2";
    let name = req.params.name;
    res.sendFile(path_1.default.resolve(`./assets/font/${req.params.type}/${name}.woff${type}`));
});
router.get("/local/:group/:type/:name", (req, res) => {
    let group = req.params.group;
    let type = req.params.type;
    let name = req.params.name;
    res.sendFile(path_1.default.resolve(`./assets/groups/${group}/${type}/${name}.${type}`));
});
router.get("/remote/:type/:name", (req, res) => {
    let type = req.params.type;
    let name = req.params.name;
    let path = `${config_json_1.default.remote}/${type}/${name}.${type}`;
    res.sendFile(path);
});
exports.default = router;

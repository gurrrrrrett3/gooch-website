"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use("/", index_1.default);
//error
//@ts-expect-error
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).sendFile(path_1.default.resolve(`./assets/groups/errors/html/500.html`));
});
//404
app.use(function (req, res) {
    res.status(404).sendFile(path_1.default.resolve(`./assets/groups/errors/html/404.html`));
});
module.exports = app;

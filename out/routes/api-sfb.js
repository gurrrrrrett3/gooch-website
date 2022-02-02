"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("../modules/util"));
const fileManager_1 = __importDefault(require("../modules/fileManager"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage(), limits: { files: 1, fileSize: 5 * 1024 * 1024 } });
const router = (0, express_1.Router)();
router.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    if (!file) {
        res.send({
            success: false,
            message: "No file uploaded, please upload a file"
        });
        return;
    }
    const code = util_1.default.genCode();
    fs_1.default.writeFile(path_1.default.resolve("temp/" + code + ".png"), file.buffer, (err) => {
        if (err) {
            res.send({
                success: false,
                message: "Error uploading file",
                error: err
            });
            return;
        }
        res.send({
            success: true,
            message: "File uploaded",
            code: code
        });
        fileManager_1.default.manageUpload(code, {
            username: req.body.username,
            itemName: req.body.item,
            ip: req.ip
        });
        console.log(req.body);
    });
});
exports.default = router;

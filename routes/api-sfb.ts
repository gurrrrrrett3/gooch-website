import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from "fs";
import Util from '../modules/util';
import FileManager from '../modules/fileManager';
const upload = multer({storage: multer.memoryStorage(), limits: {files: 1, fileSize: 5 * 1024 * 1024}});

const router = Router();

router.post("/upload", upload.single("file"),(req, res) => {
    const file = req.file;

    if (!file) {
        res.send({
            success: false,
            message: "No file uploaded, please upload a file"
        });
        return
    }

    const code = Util.genCode();
    
    fs.writeFile(path.resolve("temp/" + code + ".png"), file.buffer, (err: any) => {
        if (err) {
            res.send({
                success: false,
                message: "Error uploading file",
                error: err
            });
            return
        }

        res.send({
            success: true,
            message: "File uploaded",
            code: code
        });

        FileManager.manageUpload(code, {
            username: req.body.username,
            itemName: req.body.item,
            ip: req.ip
        });

        console.log(req.body)
    });
});

export default router;
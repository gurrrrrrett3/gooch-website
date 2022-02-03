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

        res.setHeader("Set-Cookie", `code=${code}; Path=/`).redirect("/sfb/upload");

        FileManager.manageUpload(code, {
            username: req.body.username,
            itemName: req.body.item,
            ip: req.ip
        })

        console.log(req.body)
    });
});

router.post("/bot/upload", (req, res) => {

    console.log(req.body)

    const code = Util.genCode();

    const data = FileManager.manageBotUpload(code, {
        id: req.body.user,
        itemName: req.body.item,
        url: req.body.texture
    })

    res.send(data);
})

export default router;
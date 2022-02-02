import { Router } from "express";
import path from "path";
import fs from "fs";

import sfbRouter from "./api-sfb";

const router = Router();

router.use("/sfb", sfbRouter);

router.get("/img/:code", (req, res) => {
    const filePath = path.resolve(`./data/images/${req.params.code.toUpperCase()}.png`)
    
    if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
    } else {
        res.status(404).send({
            success: false,
            error: "File not found"
        });
    }
})

router.get("/image/:code", (req, res) => {
    res.redirect(`/api/img/${req.params.code}`);
})

export default router;
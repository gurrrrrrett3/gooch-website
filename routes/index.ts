import { Router } from 'express';
import path from "path";

import assetRouter from './assets';
import plethoraRouter from './plethora';
import sfbRouter from './sfb'
import apiRouter from './api';

let router = Router();

router.use("/assets", assetRouter);
router.use("/plethora", plethoraRouter);
router.use("/sfb", sfbRouter);
router.use("/api", apiRouter);

router.get("/", (req, res) => {
    res.sendFile(path.resolve("./assets/html/index.html"));
})

router.get("/skyblock", (req, res) => {
    res.sendFile(path.resolve("./assets/html/skyblock.html"));
})

router.get("/appeal", (req, res) => {
    res.sendFile(path.resolve("./assets/html/appeal.html"));
    //res.redirect("/assets/local/mp3/connection")
})

export default router;
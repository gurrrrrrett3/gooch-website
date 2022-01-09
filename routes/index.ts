import { Router } from 'express';
import path from "path";

import assetRouter from './assets';

let router = Router();

router.use("/assets", assetRouter);

router.get("/", (req, res) => {
    res.sendFile(path.resolve("./assets/html/index.html"));
})

router.get("/appeal", (req, res) => {
    res.sendFile(path.resolve("./assets/html/appeal.html"));
})

export default router;
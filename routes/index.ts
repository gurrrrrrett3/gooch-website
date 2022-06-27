import { Router } from "express";
import path from "path";

import assetRouter from "./assets";
import plethoraRouter from "./plethora";
import sfbRouter from "./sfb";
import apiRouter from "./api";
import userRouter from "./user";
import qrRouter from "./qr";
import memeRouter from "./meme";

let router = Router();

router.use("/assets", assetRouter);
router.use("/plethora", plethoraRouter);
router.use("/sfb", sfbRouter);
router.use("/api", apiRouter);
router.use("/user", userRouter);
router.use("/qr", qrRouter);
router.use("/meme", memeRouter);

router.get("/", (req, res) => {
  res.sendFile(path.resolve("./assets/html/index.html"));
});

router.get("/skyblock", (req, res) => {
  res.sendFile(path.resolve("./assets/html/skyblock.html"));
});

router.get("/appeal", (req, res) => {
  res.sendFile(path.resolve("./assets/html/appeal.html"));
  //res.redirect("/assets/local/mp3/connection")
});

router.get("/goat", (req, res) => {
  res.redirect("https://goatse.ru");
});


router.get("/policy", (req, res) => {
  res.sendFile(path.resolve("./assets/html/policy.html"))
})

router.get("/contact", (req, res) => {
  res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
})

router.get("/colebirthday", (req, res) => {
  res.sendFile(path.resolve("./assets/html/colebirthday.html"))
})

export default router;

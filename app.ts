import express from "express";
import cookieParser from "cookie-parser";

import indexRouter from "./routes/index"

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

module.exports = app;

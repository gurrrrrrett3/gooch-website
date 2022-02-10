import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import indexRouter from "./routes/index"

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

//error
//@ts-expect-error
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).sendFile(path.resolve(`./assets/groups/errors/html/500.html`));
})

//404
app.use(function(req, res) {

    res.status(404).sendFile(path.resolve(`./assets/groups/errors/html/404.html`));
});

module.exports = app;

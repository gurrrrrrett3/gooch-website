import { Router } from "express";
import path from "path";
import config from "../config.json";

let router = Router();

router.get("/local/:type/:name", (req, res) => {

    let type = req.params.type;
    let name = req.params.name;

    res.sendFile(path.resolve(`./assets/${type}/${name}.${type}`));

})

router.get("/local/font/:type/:name", (req, res) => {

    let type = req.params.type == "1" ? "" : "2";
    let name = req.params.name;

    res.sendFile(path.resolve(`./assets/font/${req.params.type}/${name}.woff${type}`));

})

router.get("/local/:group/:type/:name", (req, res) => {

    let group = req.params.group;
    let type = req.params.type;
    let name = req.params.name;

    res.sendFile(path.resolve(`./assets/groups/${group}/${type}/${name}.${type}`));
})

router.get("/remote/:type/:name", (req, res) => {

    let type = req.params.type;
    let name = req.params.name;

    let path = `${config.remote}/${type}/${name}.${type}`;

    res.sendFile(path);
})

export default router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const list = [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://gooch.dev/",
    "https://nohello.net/en/",
    "https://dontasktoask.com/",
    "https://www.youtube.com/watch?v=WchseC9aKTU",
    "https://www.youtube.com/watch?v=9bZkp7q19f0",
    "https://discord.gg/cyt",
    "https://craftyourtown.com/",
    "https://www.youtube.com/watch?v=USE86UbsV8c",
    "https://www.youtube.com/watch?v=D-UmfqFjpl0",
    "https://www.youtube.com/watch?v=ddWJatRxfz8",
    "https://www.youtube.com/watch?v=jjS5UTRE8zY",
    "https://www.youtube.com/watch?v=9JRLCBb7qK8",
    "https://www.youtube.com/watch?v=U9t-slLl30E",
    "https://www.youtube.com/watch?v=--9kqhzQ-8Q",
    "https://www.youtube.com/watch?v=_pVNvSuA2mM",
    "https://www.youtube.com/watch?v=Re1lEVCur1o",
    "https://www.youtube.com/watch?v=EWMPVn1kgIQ",
    "https://www.youtube.com/watch?v=q6EoRBvdVPQ",
    "https://www.youtube.com/watch?v=SHnTocdD7sk",
    "https://www.youtube.com/watch?v=6bnanI9jXps",
    "https://www.youtube.com/watch?v=4feUSTS21-8",
    "https://www.youtube.com/watch?v=feA64wXhbjo",
    "https://www.youtube.com/watch?v=oZzgAjjuqZM",
    "https://www.youtube.com/watch?v=m6CeGgzaGSE",
    "https://www.youtube.com/watch?v=6EyCTHgSFME",
    "https://www.youtube.com/watch?v=HCdn0zg6NDM",
    "https://www.youtube.com/watch?v=I7Tps0M-l64",
    "https://www.youtube.com/watch?v=XDXrP9HET2A",
    "https://www.youtube.com/watch?v=WGux_CVBxOA",
    "https://www.youtube.com/watch?v=WtO3AHMBePY"
];
router.get("/", (req, res) => {
    const random = Math.floor(Math.random() * list.length);
    res.redirect(list[random]);
});
exports.default = router;

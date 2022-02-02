import { Router } from 'express';
import path from 'path';
import FuzzySet from 'fuzzyset';

import items from "../assets/groups/sfb/json/items.json"

const fuzzy = FuzzySet();

items.forEach((item) => {
    fuzzy.add(item);
});

const router = Router();

router.get("/upload", (req, res) => {
    res.sendFile(path.resolve('./assets/html/upload.html'))
})

router.get("/fuzzy/:query", (req, res) => {
    const query = req.params.query;

    res.send(fuzzy.get(query));
})

export default router;
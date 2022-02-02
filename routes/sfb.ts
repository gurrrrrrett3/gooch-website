import { Router } from 'express';
import path from 'path';

const router = Router();

router.get("/upload", (req, res) => {
    res.sendFile(path.resolve('./assets/html/upload.html'))
})

export default router;
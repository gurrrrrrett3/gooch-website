import { Router } from "express";

import sfbRouter from "./api-sfb";

const router = Router();

router.use("/sfb", sfbRouter);

export default router;
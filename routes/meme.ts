import { Router } from 'express';
import Canvas from "canvas"
import path from "path"

const router = Router();

router.get("/ip/:ip", async (req, res) => {

    const canvas = new Canvas.Canvas(1248, 720) 
    const ctx = canvas.getContext("2d")

    const img = await Canvas.loadImage(path.resolve("./assets/png/intruder.png"))
    ctx.drawImage(img, 0, 0)
    
    ctx.font = "24px Arial"
    
})

export default router;
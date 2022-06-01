import { Router } from 'express';
import Canvas from "canvas"
import path from "path"

const router = Router();

router.get("/ip", async (req, res) => {
    const t = req.query.text?.toString().split("\\n")
    if (!t) return res.status(400).send("no text")
    const buf = await renderIPImage(...t)
    res.setHeader("Content-Type", "image/png")
    res.send(buf)
})

router.get("/ip/:ip", async (req, res) => {
    const buf = await renderIPImage(req.params.ip)
    res.setHeader('Content-Type', 'image/png')
    res.send(buf)
})

async function renderIPImage(...lines: string[] ) {
    const canvas = new Canvas.Canvas(1248, 720) 
    const ctx = canvas.getContext("2d")

    const img = await Canvas.loadImage(path.resolve("./assets/png/intruder.png"))
    ctx.drawImage(img, 0, 0)
    
    ctx.font = "48px Arial"
    ctx.fillStyle = "black"
    
    ctx.fillText("nice argument",150, 250)
    ctx.fillText(`but ${lines[0]}`,150, 300)
    let y = 350
    for (let i = 1; i < lines.length; i++) {
        ctx.fillText(lines[i],150, y)
        y += 50
    }

    const buf = canvas.toBuffer()
    return buf
}

export default router;
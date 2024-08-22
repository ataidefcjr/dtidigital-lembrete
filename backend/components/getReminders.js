import express from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = express.Router()

//Busca dos lembretes
router.get('/get', async (req, res) => {
    try {
        const reminders = await prisma.reminder.findMany()
        res.status(200).json(reminders)
    }
    catch (err) {
        res.status(500).json({ message: "Ops, algo deu errado.", err })
    }
})

export default router
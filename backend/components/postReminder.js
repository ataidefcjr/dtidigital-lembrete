import express from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = express.Router()

//Cadastro de novo lembrete
router.post('/new', async (req, res) => {
    try {
        const remind = req.body

        const date = new Date(remind.date).toISOString();

        await prisma.reminder.create({
            data: {
                text: remind.text,
                date: date
            }
        })
        res.status(201).json("Lembrete Cadastrado")
    }
    catch (err) {
        res.status(500).json({ message: "Ops, algo deu errado." })
    }
})

//Exclusão de lembrete
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteReminder = await prisma.reminder.delete({ where: { id: id } });
        res.status(200).json("Lembrança excluida", deleteReminder);
    } catch (err) {
        res.status(500).json({ message: "Ops, algo deu errado." })
    }
})



export default router
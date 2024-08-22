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
        res.status(201).json({ message: "Registrado."})
    }
    catch (err) {
        res.status(500).json({ message: "Ops, algo deu errado." })
    }
})

//Exclusão de lembrete
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.reminder.delete({ where: { id: id } });
        res.status(201).json({ message: "Lembrete excluído com sucesso" });
    } catch (err) {
        res.status(500).json({ message: "Ops, algo deu errado ao excluir a lembrança." })
    }
})



export default router
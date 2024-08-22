import express from "express"
import newReminder from "./components/postReminder.js"
import getReminders from "./components/getReminders.js"

const app = express()

app.use(express.json())

app.use('/reminder', newReminder, getReminders)

app.listen(3001, () => console.log("Servidor Iniciado"))



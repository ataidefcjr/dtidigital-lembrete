import express from "express"
import cors from "cors"
import postReminder from "./components/postReminder.js"
import getReminders from "./components/getReminders.js"

const app = express()

app.use(express.json())

app.use(cors())

app.use('/reminder', getReminders, postReminder)

app.listen(3001, () => console.log("Servidor Iniciado"))



import axios from "axios"
import { validateData } from "./reminderUtils";

//Identificando o URL para qual o axios vai enviar as requisições
const api = axios.create({ 
  baseURL: 'http://localhost:3001/reminder'
})

//Envia requisição GET para obter todos os lembretes
export const getReminders = async () => {
  try {
    const response = await api.get('/get');
    return response.data;
  } catch (e) {
    console.error("Erro ao buscar lembretes");
    return [];
  }
};

//Envia uma requisição DELETE para apagar um lembrete pelo id
export const removeReminder = async (id) => {
  try {
    await api.delete("/delete/" + id);
  } catch (e) {
    console.error("Erro ao remover lembrete");
  }
};

//Envia uma requisição POST com o novo lembrete a ser inserido
export const registerSubmit = async (reminderText, reminderDate, setReminderText, setReminderDate) => {

  //Verifica se os dados inseridos são válidos, não nulos, etc...
  const dateIso = validateData(reminderText, reminderDate, setReminderDate);
  if (!dateIso) return;

  //Cria o objeto a ser enviado a API
  const newReminder = { text: reminderText, date: dateIso };
  
  try {
    await api.post("/new", newReminder)
  }catch(e){
    console.error("Erro ao registrar lembrete.")
  }

  setReminderText("");
  setReminderDate("");
};



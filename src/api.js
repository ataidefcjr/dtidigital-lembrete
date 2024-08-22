import axios from "axios"


///backend npx prisma studio
///backend node --watch server.js
//npm start


export const api = axios.create({
    baseURL: 'http://localhost:3001/reminder'
})

export const getReminders = async () => {
    try {
      const response = await api.get('/get');
      return response.data;
    } catch (e) {
      console.error("Erro ao buscar lembretes: ", e);
      return [];
    }
  };
  
export const removeReminder = async (id) => {
    try{
        await api.post("/delete/"+id);
    } catch (e) {
        console.error("Erro ao remover lembrete: ", e);
    }
};

export const registerSubmit = (reminderText, reminderDate, setReminderText, setReminderDate, setReminders, reminders) => {
    if (!reminderText || !reminderDate) {
      alert("Por favor, preencha os campos descrição do lembrete e data.");
      return;
    }
    
    const [year,month,day] = reminderDate.split('-');
    const today = new Date();
    const selectedDate = new Date(year, month -1, day);

    if (selectedDate <= today) {
      alert("Por favor, escolha uma data futura.");
      setReminderDate("");
      return;
    }
    
    const lastId = reminders.length > 0 ? reminders[reminders.length - 1].id : 0;
    const newId = lastId + 1;
    const newReminder = { id: newId, text: reminderText, date: reminderDate };
    
    setReminders([...reminders, newReminder]);
    setReminderText("");
    setReminderDate("");
  };

  
  
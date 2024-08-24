import './styles.css';
import { useState, useEffect } from "react";
import { registerSubmit, removeReminder, getReminders } from "./api";
import { groupByDate, formatDate } from "./reminderUtils";

function App() {

  const [reminders, setReminders] = useState([]);
  const [reminderText, setReminderText] = useState("");
  const [reminderDate, setReminderDate] = useState("");


  //Busca os lembretes
  const updateReminders = async () => {
    const x = await getReminders()
    setReminders(x);
  };

  //Remove um lembrete e atualiza a lista
  const handleRemoveReminder = async (id) => {
    if (confirm("Realmente deseja excluir o lembrete?")) {
      await removeReminder(id);
      updateReminders();
    } else {
      return;
    }
  }

  //Registra um novo lembrete
  const handleSubmit = async () => {
    await registerSubmit(reminderText, reminderDate, setReminderText, setReminderDate)
    updateReminders();
  };

  //Faz a busca uma vez quando a página é carregada
  useEffect(() => {
    updateReminders();
  }, []);

  //Editar Lembrete  (Coloca os dados no input e exclui o original)
  const editReminder = async (id, text, date) => {
    setReminderText(text);
    const newDate = date.split('T')[0];
    setReminderDate(newDate);
    await removeReminder(id);
    updateReminders();
    window.scrollTo(0, 0);
  }

  //Agrupa por data
  const groupedReminders = groupByDate(reminders);

  return (
    <div className="container">
      <h1 className="title">Lembra-te</h1>
      <div className="container-box">
        <div className="textInput">
          <p>O que quer lembrar?</p>
          <input
            type="text"
            placeholder="Insira a descrição do lembrete"
            maxLength="60"
            onChange={(e) => setReminderText(e.target.value)}
            value={reminderText}
          />
        </div>
        <div className="dateInput">
          <p>Quando quer ser lembrado?</p>
          <input
            type="date"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
          />
        </div>

        <button className="buttonRegister" onClick={handleSubmit}>
          Registrar
        </button>
      </div>

      <div className="reminders">
        {Object.keys(groupedReminders).length === 0 ? (
          <h3>Nenhum lembrete registrado.</h3>
        ) : (
          <h2>Lembretes</h2>
        )}

        {Object.keys(groupedReminders)
          .map((date) => (
            <div key={date} className="reminderGroup">
              <div className="reminderDate">
                <h3>Data: {formatDate(date)}</h3>
              </div>
              <div className="reminderText">
                {groupedReminders[date].map(([text, id], index) => (
                  <div key={index} className="reminderItem">
                    <p> {text} </p>
                    <div className='buttons'>
                      <button className="editButton" width="10px" onClick={() => editReminder(id, text, date)}>
                        <img src="/editIcon.png" alt="Editar" />
                      </button>
                      <button className="deleteButton" onClick={() => handleRemoveReminder(id)}>X</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}


export default App;

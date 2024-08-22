import './styles.css';
import { useState, useEffect } from "react";
import { registerSubmit, removeReminder, getReminders } from "./api";
import { groupByDate, formatDate } from "./reminderUtils";

function App() {

  const [reminders, setReminders] = useState([]);
  const [reminderText, setReminderText] = useState("");
  const [reminderDate, setReminderDate] = useState("");


  //Busca os lembretes
  const handleUpdateReminders = async() =>{
    const x = await getReminders()
    setReminders(x);
  };

  //Remove um lembrete e atualiza a lista
  const handleRemoveReminder = async(id) =>{
    await removeReminder(id);
    await handleUpdateReminders();
  }

  const handleSubmit = () => {
    registerSubmit(reminderText, reminderDate, setReminderText, setReminderDate, setReminders, reminders)
  };
  
    //Faz a busca 1 vez
    useEffect(() => {
      handleUpdateReminders();
    }, []);
  //Gera array diferente com as datas agrupadas
  const groupedReminders = groupByDate(reminders);

  
  return (
    <div className="container">
      <h1 className="title">Lembra-te</h1>
      <div className="container-box">
        <div className="textInputContainer">
          <p>O que quer lembrar?</p>
          <input
            type="text"
            placeholder="Insira a descrição do lembrete"
            maxLength="50"
            onChange={(e) => setReminderText(e.target.value)}
            value={reminderText}
          />
        </div>
        <div className="dateInputContainer">
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
          .sort((a, b) => new Date(a) - new Date(b))
          .map((date) => (
            <div key={date} className="reminderGroup">
              <div className="reminderDate">
                <h3>Data: {formatDate(date)}</h3>
              </div>
              <div className="reminderText">
                {groupedReminders[date].map(([text, id], index) => (
                  <div key={index} className="reminderItem">
                    <p>Lembrete: {text} </p>
                    <button className="deleteButton" onClick={() => handleRemoveReminder(id)}>X</button>
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

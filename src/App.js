import './styles.css';
import { useState } from "react";

function App() {

  const [reminders, setReminders] = useState([])

  const [reminderText, setReminderText] = useState("");
  const [reminderDate, setReminderDate] = useState("");

  const registerSubmit = () => {
    if(!reminderText || !reminderDate) {
      alert("Por favor, preencha os campos descrição do lembrete e data.")
      return;
    }
    const today = new Date();
    const selectedDate = new Date(reminderDate);
    
    if (selectedDate <= today) {
      alert("Por favor, escolha uma data futura.");
      setReminderDate("");
      return;
    }
    addReminder(reminderText, reminderDate); //substituir por database
    setReminderDate("");
    setReminderText("");
  }
  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };
  const addReminder = (reminderText, reminderDate) => {
    const lastId = reminders.length > 0 ? reminders[reminders.length - 1].id : 0;
    const newId = lastId + 1;
    const newReminder = {
      id: newId,
      text: reminderText,
      date: reminderDate,
    };
    setReminders([...reminders, newReminder]);
  };

  const groupByDate = (reminders) => {
    return reminders.reduce((acc, reminder) => {
      const { date, text, id } = reminder;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push([text,id]);
      return acc;
    }, {});
  };
  const groupedReminders = groupByDate(reminders);

  const removeReminder = (id) =>{
    console.log(id)
    const newReminders = [...reminders]
    const filteredReminders = newReminders.filter((reminders) =>
      reminders.id !== id ? reminders: null
    );
    setReminders(filteredReminders);

  }

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

        <button className="buttonRegister" onClick={registerSubmit}>
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
        .sort((a,b) => new Date(a) - new Date(b))
        .map((date) => (
          <div key={date} className="reminderGroup">
            <div className="reminderDate">
              <h3>Data: {formatDate(date)}</h3>
            </div>
            <div className="reminderText">
              {groupedReminders[date].map(([text,id], index) => (
                <div key={index} className="reminderItem">
                  <p>Lembrete: {text} </p> 
                  <button className="deleteButton" onClick={() => removeReminder(id)}>X</button>
                </div>
              ))}
            </div>
          </div>
        ))
        }
      </div>
    </div>


  );
}

export default App;

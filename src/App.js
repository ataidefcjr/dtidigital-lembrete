import './styles.css';
import { useState } from "react";

function App() {
  const [reminders, setReminders] = useState([])

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const registerSubmit = () => {
    if(!title || !date) return;
    addReminder(title, date); //substituir por database
    setDate("");
    setTitle("");
  }
  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };
  const addReminder = (title, date) => {
    const lastId = reminders.length > 0 ? reminders[reminders.length - 1].id : 0;
    const newId = lastId + 1;
    const formatedDate = formatDate(date);
    const newReminder = {
      id: newId,
      text: title,
      date: formatedDate,
    };
    setReminders([...reminders, newReminder]);
  };

  const groupByDate = (reminders) => {
    return reminders.reduce((acc, reminder) => {
      const { date, text } = reminder;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(text);
      return acc;
    }, {});
  };
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
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          />
        </div>
        <div className="dateInputContainer">
          <p>Quando quer ser lembrado?</p>
          <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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

        {Object.keys(groupedReminders).map((date) => (
          <div key={date} className="reminderGroup">
            <div className="reminderDate">
              <h3>Data: {date}</h3>
            </div>
            <div className="reminderText">
              {groupedReminders[date].map((text, index) => (
                <div key={index} className="reminderItem">
                  <span>Lembrete: {text} </span> 
                  <button>X</button>
                </div>
              ))}
            </div>
          </div>
        ))
        }
      </div>


      {/* <div className="reminders">
      {grouped.length === 0 ? (
        <h3>Nenhum lembrete registrado.</h3>
      ):(
        <h2>Lembretes</h2>
      )
      }
        {reminders.map((reminders) => (
            <div key={reminders.id} className="reminderGroup">
              <div className="reminderDate">
                <h3>Data: {reminders.date}</h3>
              </div>
              <div className="reminderText">
                <span>Lembrete: {reminders.text} </span>
                <button>Excluir</button>
              </div>
            </div>
          ))
        }
      </div> */}

 


    </div>


  );
}

export default App;

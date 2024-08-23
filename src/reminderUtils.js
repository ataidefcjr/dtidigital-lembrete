//Utilitários

//Agrupa os lembretes nas mesmas datas apenas para exibição na tela
export const groupByDate = (reminders) => {
    return reminders.reduce((acc, reminder) => {
        const { date, text, id } = reminder;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push([text, id]);
        return acc;
    }, {});
};


//Formata a data no formato ISO para ser mostrada na tela no formado DD/MM/YYYY
export const formatDate = (date) => {
    const fdate = date.split('T')[0];
    const [year, month, day] = fdate.split('-');

    return `${day}/${month}/${year}`;
};


//Faz a validação dos dados inseridos pelo usuario e converte a data informada pro modelo ISO usado no Banco de Dados
export const validateData = (reminderText, reminderDate, setReminderDate) => {

    if (!reminderText || !reminderDate) {
        alert("Por favor, preencha os campos descrição do lembrete e data.");
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0)
    const selectedDate = new Date(reminderDate);

    if (selectedDate <= today) {
        alert("Por favor, escolha uma data futura.");
        setReminderDate("");
        return;
    }

    const dateIso = selectedDate.toISOString();

    return dateIso;
};

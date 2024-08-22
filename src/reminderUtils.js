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

export const formatDate = (date) => {

    const fdate = date.split('T')[0];
    const [year, month, day] = fdate.split('-');

    return `${day}/${month}/${year}`;
};



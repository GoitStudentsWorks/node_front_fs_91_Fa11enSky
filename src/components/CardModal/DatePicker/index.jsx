import '../../../../node_modules/react-datepicker/dist/react-datepicker.css'
import { useState } from "react";
import DatePicker from "react-datepicker"
import { format } from 'date-fns';
import "./styles.css"


const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// ** Modified date picker
// ** Компонент створює динамічну розмітку календаря в залежності від пропсів.
// ** Очікує пропси: onChange, date.
// ** onChange - очікує функцію для запису дати в стан батьківського компоненту.
// ** date - очікує об'єкт типу Date для вибору поточної дати, не є обов'язковим.
// ** Повертає JSX розмітку.

export const ModifiedDatePicker = ({ onChange, date = new Date() }) => {
    const [startDate, setStartDate] = useState(date);
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        setIsOpen(!isOpen);
        setStartDate(e);
        onChange(e)
    };

    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    const utcDate = new Date(startDate.getTime() + 60000);

    console.log('UTC', utcDate);
    return (
        <>
            <button className="custom-input" onClick={handleClick}>
                {startDate.getDate() === new Date().getDate() && <p>Today, {format(startDate, "MMMM d")}</p>}
                {startDate.getDate() !== new Date().getDate() && <p>{dayOfWeek[startDate.getDay()]}, {format(startDate, "MMMM d")}</p>}
            </button>
            {isOpen && (
                <DatePicker id='date_picker'
                    minDate={new Date()}
                    calendarStartDay={1}
                    selected={startDate}
                    onChange={handleChange} inline />
            )}
        </>
    );
};
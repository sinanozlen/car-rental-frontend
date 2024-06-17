import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';

function MyComponent() {
    const [pickUpDate, setPickUpDate] = useState(null);
    const [pickUpTime, setPickUpTime] = useState('');
    const [dropOffDate, setDropOffDate] = useState(null);
    const [dropOffTime, setDropOffTime] = useState('');

    const handlePickUpDateChange = (date) => {
        setPickUpDate(date);
        setDropOffDate(null); // Alış tarihi değiştiğinde bırakma tarihini sıfırla
        setDropOffTime(''); // Bırakma saatini sıfırla
    };

    const handlePickUpTimeChange = (time) => {
        setPickUpTime(time);
        if (dropOffDate && dropOffDate.getTime() === pickUpDate.getTime()) {
            const pickUpDateTime = new Date(pickUpDate);
            pickUpDateTime.setHours(time.split(':')[0]);
            pickUpDateTime.setMinutes(time.split(':')[1]);
            const minDropOffTime = new Date(pickUpDateTime.getTime() + 30 * 60000);

            const currentDropOffTime = new Date(dropOffDate);
            currentDropOffTime.setHours(dropOffTime.split(':')[0]);
            currentDropOffTime.setMinutes(dropOffTime.split(':')[1]);

            if (currentDropOffTime <= minDropOffTime) {
                setDropOffTime(minDropOffTime.toISOString().substr(11, 5));
            }
        }
    };

    const handleDropOffDateChange = (date) => {
        setDropOffDate(date);
        if (date && date.getTime() < pickUpDate.getTime()) {
            setPickUpDate(null);
            setPickUpTime('');
        }
    };

    const handleDropOffTimeChange = (time) => {
        setDropOffTime(time);
        if (dropOffDate.getTime() === pickUpDate.getTime()) {
            const pickUpDateTime = new Date(pickUpDate);
            pickUpDateTime.setHours(pickUpTime.split(':')[0]);
            pickUpDateTime.setMinutes(pickUpTime.split(':')[1]);
            const minDropOffTime = new Date(pickUpDateTime.getTime() + 30 * 60000);

            const currentDropOffTime = new Date(dropOffDate);
            currentDropOffTime.setHours(time.split(':')[0]);
            currentDropOffTime.setMinutes(time.split(':')[1]);

            if (currentDropOffTime <= minDropOffTime) {
                setDropOffTime(minDropOffTime.toISOString().substr(11, 5));
            }
        }
    };

    const handleSubmit = () => {
        console.log('Pick-up Date and Time:', pickUpDate, pickUpTime);
        console.log('Drop-off Date and Time:', dropOffDate, dropOffTime);
    };

    return (
        <div>
            <h2>Pick-up Date and Time</h2>
            <DatePicker
                selected={pickUpDate}
                onChange={handlePickUpDateChange}
                dateFormat="MMMM d, yyyy"
                className="date-picker"
            />
            <TimePicker
                value={pickUpTime}
                onChange={handlePickUpTimeChange}
                format="HH:mm"
                className="time-picker"
                disableClock={true}
            />

            <h2>Drop-off Date and Time</h2>
            <DatePicker
                selected={dropOffDate}
                onChange={handleDropOffDateChange}
                dateFormat="MMMM d, yyyy"
                className="date-picker"
                minDate={pickUpDate} // Bırakma tarihi seçimini alış tarihinden sonrasına kısıtla
            />
            <TimePicker
                value={dropOffTime}
                onChange={handleDropOffTimeChange}
                format="HH:mm"
                className="time-picker"
                disableClock={true}
            />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default MyComponent;

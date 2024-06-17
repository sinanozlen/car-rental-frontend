import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const HomePage = () => {
    const { register, handleSubmit, control, watch } = useForm();
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");

    useEffect(() => {
        axios.get('https://localhost:7250/api/Locations')
            .then(response => {
                setLocations(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the locations!', error);
            });
    }, []);

    const onSubmit = (data) => {
        console.log(data);
    };

    const startDate = watch('startDate');
    const endDate = watch('endDate');

    const minEndDate = new Date(startDate);
    minEndDate.setMinutes(minEndDate.getMinutes() + 30); // Add 30 minutes to the start date

    return (
        <div>
            <h1>Aracı Nereden Alacaksınız</h1>
            <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                <option value="" disabled>Lokasyon Seçin</option>
                {locations.map(location => (
                    <option key={location.locationID} value={location.locationID}>
                        {location.name}
                    </option>
                ))}
            </select>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Pick-up Date and Time</label>
                    <Controller
                        name="startDate"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                showTimeSelect
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                minDate={new Date()}
                            />
                        )}
                    />
                </div>

                <div>
                    <label>Drop-off Date and Time</label>
                    <Controller
                        name="endDate"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                showTimeSelect
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                minDate={minEndDate}
                                disabled={!startDate}
                            />
                        )}
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default HomePage;

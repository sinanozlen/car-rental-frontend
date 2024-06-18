import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/styles.css'; // Stil dosyasını içe aktar

const HomePage = () => {
    const { handleSubmit, control, watch } = useForm();
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");

    useEffect(() => {
        axios.get('https://localhost:7250/api/Locations')
            .then(response => {
                setLocations(response.data);
            })
            .catch(error => {
                console.error('Lokasyonlar alınırken bir hata oluştu!', error);
            });
    }, []);

    const onSubmit = (data) => {
        console.log(data);
    };

    const startDate = watch('startDate');
    const minEndDate = startDate ? new Date(startDate) : new Date();
    minEndDate.setMinutes(minEndDate.getMinutes() + 30); // Başlangıç tarihine 30 dakika ekleyin

    return (
        <div className="container">
            <h1 className="header">Aracı Nereden Alacaksınız?</h1>
            <div className="form-group">
                <label htmlFor="location"><FontAwesomeIcon icon={faMapMarkerAlt} className="icon" /> Lokasyon Seçin</label>
                <select id="location" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                    <option value="" disabled>Lokasyon Seçin</option>
                    {locations.map(location => (
                        <option key={location.locationID} value={location.locationID}>
                            {location.name}
                        </option>
                    ))}
                </select>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="inline-group">
                    <div className="form-group">
                        <label><FontAwesomeIcon icon={faCalendarAlt} className="icon" /> Alış Tarihi ve Saati</label>
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
                                    className="datepicker"
                                />
                            )}
                        />
                    </div>
                    <div className="form-group">
                        <label><FontAwesomeIcon icon={faCalendarAlt} className="icon" /> Teslim Tarihi ve Saati</label>
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
                                    className="datepicker"
                                    disabled={!startDate}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="form-group option-group">
                    <input type="checkbox" id="different-location" />
                    <label htmlFor="different-location">
                       
                        Farklı yerde bırakmak istiyorum
                    </label>
                    <FontAwesomeIcon icon={faInfoCircle} className="icon" />
                </div>
                <div className="form-group option-group">
                    <input type="checkbox" id="promo-code" />
                    <label htmlFor="promo-code">
                        
                        Promosyon kodu kullan
                    </label>
                    <FontAwesomeIcon icon={faInfoCircle} className="icon" />
                </div>
                <button type="submit">En Uygun Aracı Bul</button>
            </form>
        </div>
    );
};

export default HomePage;

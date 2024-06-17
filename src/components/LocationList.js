import React, { useState, useEffect } from 'react';
import LocationService from '../services/locationService';
import LocationItem from './LocationItem';

const LocationList = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        LocationService.getAllLocations()
            .then(response => {
                setLocations(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the locations!", error);
            });
    }, []);

    return (
        <div>
            {locations.map(location => (
                <LocationItem key={location.id} location={location} />
            ))}
        </div>
    );
};

export default LocationList;

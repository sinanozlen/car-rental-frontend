import React from 'react';

const LocationItem = ({ location }) => {
    return (
        <div>
            <h3>{location.name}</h3>
            <p>ID: {location.id}</p>
        </div>
    );
};

export default LocationItem;

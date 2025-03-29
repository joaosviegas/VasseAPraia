import React from 'react';
import './DataContainers.css';

const SeaCard = ({ location, temperature, tide }) => {
  return (
    <div className="sea-card">
      <h2 className="sea-location">{location}</h2>
      <div className="sea-details">
        <p className="sea-temperature">Temperature: {temperature}°C</p>
        <p className="sea-tide">Tide: {tide}</p>
      </div>
    </div>
  );
};

export default SeaCard;
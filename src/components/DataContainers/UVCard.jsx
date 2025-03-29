import React from 'react';
import './DataContainers.css';

const UVCard = ({ location, uvIndex, warning }) => {
  return (
    <div className="uv-card">
      <h2 className="sea-location">{location}</h2>
      <div className="uv-item">
        <span className="uv-index">UV Index: {uvIndex}</span>
        {warning && <span className={`warning ${warning}`}>{warning}</span>}
      </div>
    </div>
  );
};

export default UVCard;
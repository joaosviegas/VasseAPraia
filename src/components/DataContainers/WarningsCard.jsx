import React from 'react';
import './DataContainers.css';

const WarningsCard = ({ warnings = [] }) => {
  return (
    <div className="warnings-card">
      <h2>Warnings</h2>
      {warnings && warnings.length > 0 ? (
        warnings.map((warning, index) => (
          <div key={index} className="warning-item">
            <span className="warning-location">{warning.location}</span>
            <span className={`warning-level ${warning.level}`}>{warning.type}</span>
            <span className="warning-text">{warning.text}</span>
            <span className="warning-time">{warning.time}</span>
          </div>
        ))
      ) : (
        <p>No warnings at this time.</p>
      )}
    </div>
  );
};

export default WarningsCard;
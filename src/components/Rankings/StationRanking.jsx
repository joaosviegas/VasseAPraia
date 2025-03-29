import React from 'react';
import './Rankings.css';

const StationRanking = ({ rank, name, details, warnings }) => {
  return (
    <div className="station-ranking">
      <div className="station-header">
        <div className="station-rank">{rank}</div>
        <h3>{name}</h3>
        {warnings && (
  <span 
    className={`warning ${warnings.type}`}
    data-tooltip={
      warnings.type === 'wind-warning' 
        ? 'Aviso de ventos fortes (>20 km/h)' 
        : warnings.type === 'rain-warning' 
        ? 'Aviso de chuva (>10 mm)' 
        : 'Aviso'
    }
  >
    {warnings.label}
  </span>
)}
      </div>
      <div className="station-details">
        <div className="metrics-primary">
          {details.map((detail, index) => (
            <div className="metric" key={index}>
              <span className="metric-value">{detail.value}</span>
              <span className="metric-label">{detail.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StationRanking;
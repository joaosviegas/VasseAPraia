import React from 'react';
import './DataContainers.css';

const DataContainers = ({ warnings = [], seaData = [], uvData = [] }) => {
  return (
    <div className="data-containers">
      {/* Warnings Card */}
      <div className="data-card warnings-card">
        <h3><i className="fas fa-exclamation-triangle"></i> Avisos</h3>
        {warnings.length > 0 ? warnings.map((warning, index) => (
          <div className="warning-item" key={index}>
            <span className="warning-location">{warning.location}: </span>
            <span className="warning-type">{warning.type}</span>
            <span className="warning-text">{warning.text}</span>
            <span className={`warning-level ${warning.level?.toLowerCase()}`}>({warning.level})</span>
            <span className="warning-time">
              De {new Date(warning.start).toLocaleString()} até {new Date(warning.end).toLocaleString()}
            </span>
          </div>
        )) : (
          <p>Sem avisos ativos 😎</p>
        )}
      </div>

      {/* Sea Conditions */}
      <div className="data-card sea-card">
        <h3><i className="fas fa-water"></i> Condições do Mar</h3>
        {seaData.map((sea, index) => (
          <div className="sea-item" key={index}>
            <span className="sea-location">{sea.location}:</span>
            <div className="sea-details">
              <span className="sea-temperature"><i className="fas fa-thermometer-half"></i> {sea.sea_temp}°C</span>
              <span className="sea-tide"><i className="fas fa-arrow-up"></i> Maré Cheia: {sea.full_tide}m</span>
              <span className="sea-tide"><i className="fas fa-arrow-down"></i> Maré Baixa: {sea.low_tide}m</span>
            </div>
          </div>
        ))}
      </div>

      {/* UV Index */}
      <div className="data-card uv-card">
        <h3><i className="fas fa-sun"></i> Índice UV</h3>
        {uvData.map((uv, index) => (
          <div className="uv-item" key={index}>
            <span className="uv-location">{uv.location}:</span>
            <span className="uv-index">{uv.uv_index}</span>
            <span className="uv-time">({uv.uv_time})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataContainers;
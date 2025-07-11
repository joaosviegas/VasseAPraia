import React from 'react';
import Tooltip from '../common/Tooltip';
import './StationRanking.css';

const StationRanking = ({ 
  station, 
  index, 
  onStationClick,
  getComfortClass,
  getWarningIcons 
}) => {
  const comfortClass = getComfortClass(station.comfort_index);
  const warnings = getWarningIcons(station.warnings);

  const handleClick = () => {
    if (onStationClick) {
      onStationClick(station);
    }
  };

  return (
    <div 
      className="station-ranking" 
      style={{ transitionDelay: `${index * 50}ms` }} 
      onClick={handleClick}
    >
      <div className="station-header">
        <span className="station-rank">{index + 1}</span>
        <h3>{station.name}</h3>
        {warnings}
      </div>
      <div className="station-details">
        <div className="metrics-primary">
          <div className="metric">
            <span className={`metric-value ${comfortClass}`}>{station.points}</span>
            <span className="metric-label">Pontuação</span>
          </div>
          <div className="metric">
            <span className="metric-value">
              {station.max_temp === -Infinity ? 'Estação Indisponível' : station.max_temp + '°C'}
            </span>
            <span className="metric-label">Temperatura Máxima</span>
          </div>
        </div>
        <div className="metrics-secondary">
          <p>
            <i className="fas fa-map-marker-alt"></i> 
            <strong>Concelho:</strong> {station.city}
          </p>
          <p>
            <i className="fas fa-thermometer-half"></i> 
            <strong>Horas acima de 20°C:</strong> {station.hours_above_20}
          </p>
          <p>
            <i className="fas fa-cloud-rain"></i> 
            <strong>Precipitação atual:</strong> {station.precipitation.toFixed(1)} mm
          </p>
          <p>
            <i className="fas fa-wind"></i> 
            <strong>Velocidade média do Vento:</strong> {station.wind_speed.toFixed(1)} km/h
          </p>
        </div>
      </div>
    </div>
  );
};

export default StationRanking;
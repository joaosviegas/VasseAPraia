import React, { useEffect } from 'react';
import Tooltip from '../common/Tooltip';
import './Rankings.css';

const Rankings = ({ rankingsData = [], lastUpdated, onStationClick }) => {
  useEffect(() => {
    // Adicionar animação após o componente montar
    const timeout = setTimeout(() => {
      document.querySelectorAll('.station-ranking').forEach(el => {
        el.classList.add('visible');
      });
    }, 100);
    return () => clearTimeout(timeout);
  }, [rankingsData]);

  // Funções auxiliares
  const getComfortClass = (comfortIndex) => {
    if (comfortIndex >= 75) return 'excellent';
    if (comfortIndex >= 50) return 'good';
    if (comfortIndex >= 25) return 'moderate';
    return 'poor';
  };

  const getWarningIcons = (warnings) => {
    if (!warnings || warnings.length === 0) return '';
    
    return warnings.map((warning, index) => {
      if (warning.includes('wind')) 
        return (
          <Tooltip key={index} text="Esta região registou ventos superiores a 20 km/h">
          <span className="warning wind-warning">
            <i className="fas fa-wind"></i>
          </span>
        </Tooltip>
      );
    if (warning.includes('rain')) 
      return (
        <Tooltip key={index} text="Esta região registou mais de 10 mm de chuva">
          <span className="warning rain-warning">
            <i className="fas fa-cloud-rain"></i>
          </span>
        </Tooltip>
      );
    return null;
  });
};

const handleStationClick = (station) => {
  if (onStationClick) {
    onStationClick(station);
  }
};

  return (
    <section className="rankings">
      
      <div className="rankings-list">
        {rankingsData.map((station, index) => {
          const comfortClass = getComfortClass(station.comfort_index);
          const warnings = getWarningIcons(station.warnings);
          
          return (
            <div className="station-ranking" key={index} style={{transitionDelay: `${index * 50}ms`}} onClick={() => handleStationClick(station)}>
              <div className="station-header">
                <span className="station-rank">{index + 1}</span>
                <h3>{station.name}</h3>
                {warnings}
              </div>
              <div className="station-details">
                <div className={`metrics-primary ${comfortClass}`}>
                  <div className="metric">
                    <span className="metric-value">{station.points}</span>
                    <span className="metric-label">Pontuação</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">{station.max_temp === -Infinity ? 'N/A' : station.max_temp + '°C'}</span>
                    <span className="metric-label">Temperatura Máxima</span>
                  </div>
                  
                </div>
                <div className="metrics-secondary">
                  <p><i className="fas fa-map-marker-alt"></i> <strong>Concelho:</strong> {station.city}</p>
                  <p><i className="fas fa-thermometer-half"></i> <strong>Horas acima de 20°C:</strong> {station.hours_above_20}</p>
                  <p><i className="fas fa-cloud-rain"></i> <strong>Precipitação atual:</strong> {station.precipitation.toFixed(1)} mm</p>
                  <p><i className="fas fa-wind"></i> <strong>Velocidade média do Vento:</strong> {station.wind_speed.toFixed(1)} km/h</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="legend">
        <h4>Legenda:</h4>
        <div className="legend-item"><span className="warning wind-warning"><i className="fas fa-wind"></i></span> Aviso de Ventos fortes (&gt;20 km/h)</div>
        <div className="legend-item"><span className="warning rain-warning"><i className="fas fa-cloud-rain"></i></span> Chuva total (&gt;10 mm)</div>
        <div className="legend-index">Índice: 
          <span className="comfort-indicator excellent">75-100</span>
          <span className="comfort-indicator good">50-74</span>
          <span className="comfort-indicator moderate">25-49</span>
          <span className="comfort-indicator poor">0-24</span>
        </div>
      </div>
    </section>
  );
};

export default Rankings;
import React, { useEffect } from 'react';
import Tooltip from '../common/Tooltip';
import StationRanking from './StationRanking';
import './Rankings.css';
import { formatDateTime } from '../../utils/dateUtils';


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

  // Helper functions
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

  return (
    <section className="rankings">
      <div className="rankings-tag">Rankings</div>
      <h2 className="rankings-title">Melhores Sítios para fazer Praia Hoje</h2>
      <div className="rankings-header">
        <p className="update-time">Atualizado às: {formatDateTime(lastUpdated)}</p>
      </div>
      <div className="rankings-list">
        {rankingsData.map((station, index) => (
          <StationRanking
            key={index}
            station={station}
            index={index}
            onStationClick={onStationClick}
            getComfortClass={getComfortClass}
            getWarningIcons={getWarningIcons}
          />
        ))}
      </div>

      <div className="legend">
        <h4>Legenda:</h4>
        <div className="legend-item">
          <span className="warning wind-warning">
            <i className="fas fa-wind"></i>
          </span> 
          Aviso de Ventos fortes (&gt;20 km/h)
        </div>
        <div className="legend-item">
          <span className="warning rain-warning">
            <i className="fas fa-cloud-rain"></i>
          </span> 
          Chuva total (&gt;10 mm)
        </div>
        <div className="legend-index">
          Índice: 
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
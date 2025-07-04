import React from 'react';
import Tooltip from '../common/Tooltip';
import { formatDateTime } from '../../utils/dateUtils';
import './DataContainers.css';

const DataContainers = ({ warnings = [], seaData = [], uvData = [] }) => {

  const getWarningLevelClass = (level) => {
    if (!level) return '';

    switch (level) {
      case 'yellow':
        return 'warning-yellow';
      case 'orange':
        return 'warning-orange';
      case 'red':
        return 'warning-red';
      default:
        return '';
    }
  }

  const getUVLevelClass = (uvIndex) => {
    if (!uvIndex) return '';

    if (uvIndex < 3) {
      return 'low';
    } else if (uvIndex < 6) {
      return 'moderate';
    } else if (uvIndex < 8) {
      return 'high';
    } else if (uvIndex < 11) {
      return 'very-high';
    } else {
      return 'extreme';
    }
  }

  const getUVLevelClassText = (uvIndex) => {
    if (!uvIndex) return '';

    if (uvIndex < 3) {
      return 'UV Baixo';
    } else if (uvIndex < 6) {
      return 'UV Moderado';
    } else if (uvIndex < 8) {
      return 'UV Alto';
    } else if (uvIndex < 11) {
      return 'UV Muito ALto - Evitar exposição solar';
    } else {
      return 'UV Extremo - Evitar exposição solar!';
    }
  }

  return (
    <div className="data-containers">
      {/* Warnings Card */}
      <div className="data-card warnings-card">
        <h3><i className="fas fa-exclamation-triangle"></i> Avisos</h3>
        {warnings.length > 0 ? warnings.map((warning, index) => (
          <div className={`warning-item ${getWarningLevelClass(warning.level)}`}key={index}>
            <div className="warning-header">
              <span className="warning-location">{warning.location}:&nbsp;</span>
              <span className="warning-type">{warning.type}</span>
            </div>
            <span className="warning-text">{warning.text}</span>
            <span className="warning-time">
              De {formatDateTime(warning.start)} até {formatDateTime(warning.end)}
            </span>
          </div>
        )) : (
          <p>Sem avisos ativos 😎</p>
        )}
      </div>

      {/* UV Index */}
      <div className="data-card uv-card">
        <h3><i className="fas fa-sun"></i> Índice UV</h3>
        {uvData.map((uv, index) => (
          <div className={`uv-item ${getUVLevelClass(uv.uv_index)}`} key={index}>
            <span className="uv-location">{uv.location}:</span>
            <Tooltip text = {getUVLevelClassText(uv.uv_index)}> 
              <span className="uv-index">{uv.uv_index}</span>
            </Tooltip>
            <span className="uv-time">({uv.uv_time})</span>
          </div>
        ))}
      </div>

      {/* Sea Conditions */}
      <div className="data-card sea-card">
        <h3><i className="fas fa-water"></i> Condições do Mar</h3>
        {seaData.sort((a,b) => a.location === "Madeira" ? -1 : 1).map((sea, index) => (
          <div className="sea-item" key={index}>
            <span className="sea-location">{sea.location}:</span>
            <div className="sea-details">
              <span className="sea-temperature"><i className="fas fa-thermometer-half"></i> Temperatura do Mar: {sea.sea_temp}°C</span>
              <span className="sea-tide"><i className="fas fa-arrow-up"></i> Maré Cheia: {sea.full_tide}m</span>
              <span className="sea-tide"><i className="fas fa-arrow-down"></i> Maré Baixa: {sea.low_tide}m</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default DataContainers;
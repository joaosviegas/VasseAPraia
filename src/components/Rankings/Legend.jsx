import React from 'react';
import './Rankings.css';

const Legend = () => {
  return (
    <div className="legend">
      <h4>Comfort Index Legend</h4>
      <div className="legend-item">
        <span className="comfort-indicator excellent"></span>
        <span>Excellent</span>
      </div>
      <div className="legend-item">
        <span className="comfort-indicator good"></span>
        <span>Good</span>
      </div>
      <div className="legend-item">
        <span className="comfort-indicator moderate"></span>
        <span>Moderate</span>
      </div>
      <div className="legend-item">
        <span className="comfort-indicator poor"></span>
        <span>Poor</span>
      </div>
      <h4>Warning Levels</h4>
      <div className="legend-item">
        <span className="warning-level yellow"></span>
        <span>Yellow: Caution</span>
      </div>
      <div className="legend-item">
        <span className="warning-level orange"></span>
        <span>Orange: Warning</span>
      </div>
      <div className="legend-item">
        <span className="warning-level red"></span>
        <span>Red: Danger</span>
      </div>
    </div>
  );
};

export default Legend;
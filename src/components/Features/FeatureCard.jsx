import React from 'react';
import './Features.css';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature">
      <div className="icon">
        <i className={icon}></i>
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
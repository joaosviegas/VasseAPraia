import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <section className="features">
      <div className="feature">
        <i className="fas fa-sun icon"></i>
        <h2>Análise do Tempo</h2>
        <p>Our algorithm analyzes real-time weather conditions from various stations across Madeira to find the ideal beach spot.</p>
      </div>
      <div className="feature">
        <i className="fas fa-wind icon"></i>
        <h2>Condições Atmosféricas</h2>
        <p>We track wind speed and conditions to ensure you enjoy a comfortable and safe beach experience.</p>
      </div>
      <div className="feature">
        <i className="fas fa-temperature-high icon"></i>
        <h2>Avaliação de Temperatura</h2>
        <p>Each beach is rated based on temperature patterns throughout the day, focusing on the peak hours from 10:00 to 18:00.</p>
      </div>
    </section>
  );
};

export default Features;
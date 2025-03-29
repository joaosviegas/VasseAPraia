import React from 'react';
import './Hero.css';

const Hero = ({ onFindBeach }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Vasse à Praia?</h1>
        <p>Encontra o sítio com melhor tempo para fazer praia na ilha!</p>
        <button id="calculate-beach" className="cta-button" onClick={onFindBeach}>Começar</button>
      </div>
    </section>
  );
};

export default Hero;
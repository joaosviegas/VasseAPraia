import React from 'react';
import './Hero.css';

const Hero = ({ onFindBeach }) => {

    const handleScroll = (id) => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-tag">Ainda não sabes onde fazer praia hoje?</div>
        <h1>Vasse à Praia?</h1>
        <p>Encontra o sítio com melhor tempo para fazer praia agora!</p>
        <div className="hero-buttons">
          <button id="calculate-beach" className="cta-button" onClick={onFindBeach}>Começar<i className="fa-solid fa-arrow-right" style={{ padding: "0px 0px 0px 8px"}}></i></button>
          <button id="know-more" className="know-more-button" onClick={() => handleScroll('features')}>Descobrir mais</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
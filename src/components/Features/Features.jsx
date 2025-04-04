import React from 'react';
import './Features.css';
import './FeatureCard.css';
import FeatureCard from './FeatureCard';

const Features = () => {
  return (
    <section className="features-section">
      {/* Background Grid */}
      <div className="grid"></div>
      
      <div className="features">
        <FeatureCard 
          icon="fas fa-sun"
          title="Previsão Metereológica"
          description="Analise dados de temperatura, UV e índices de conforto para cada praia"
        />
        <FeatureCard 
          icon="fas fa-sort-amount-down"
          title="Ranking Inteligente"
          description="Algoritmo que classifica praias baseado nas melhores condições de hoje"
        />
        <FeatureCard 
          icon="fas fa-warning"
          title="Avisos e Alertas"
          description="Receba informação sobre avisos meteorológicos importantes"
        />
      </div>
    </section>
    
  );
};

export default Features;
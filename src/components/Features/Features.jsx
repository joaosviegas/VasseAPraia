import React from 'react';
import './Features.css';

const Features = ({ onFindBeach }) => {
  return (
    <section className="features-section">
      <div className="container">
        
        {/* Primera feature - Pain Points */}
        <div className="feature-row">
          <div className="feature-content">
            <div className="feature-tag">Problemas</div>
            <h2 className="feature-title">
              Farto de perder tempo à procura de bom tempo?
            </h2>
            <p className="feature-description">
              Sabemos como é frustrante querer ir à praia e não saber onde está bom tempo, 
              gastar 30 minutos a ver previsões e webcams, tudo isto para chegar à praia e ver que não está bom tempo. 
              Assim gasta-se tempo, paciência e perde-se um dia de praia por causa de...
            </p>
            <div className="feature-points">
              <div className="point">
                <i className="fa-solid fa-list-ul" style={{ fontSize: '2rem', color: '#1a73e8' }}></i>
                <span>Informação espalhada por vários sites</span>
              </div>
              <div className="point">
                <i className="fa-solid fa-question" style={{ fontSize: '2rem', color: '#1a73e8'}}></i>
                <span>Não saber que praias existem e onde</span>
              </div>
              <div className="point">
                <i className="fa-solid fa-cloud-sun-rain" style={{ fontSize: '2rem', color: '#1a73e8'}}></i>
                <span>Previsões que não correspondem ao estado atual do tempo</span>
              </div>
            </div>
            <button id="feature-button" className="cta-button" onCLick={onFindBeach}>Experimenta agora<i className="fa-solid fa-arrow-right" style={{ padding: "0px 0px 0px 8px"}}></i></button>
          </div>
          <div className="feature-image">
            <div className="image-placeholder">
              <div className="placeholder-content">
                <div className="placeholder-icon">🏖️</div>
                <span>Imagem: Pessoa frustrada procurando informações no telemóvel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Segunda feature - Soluções */}
        <div className="feature-row reverse">
          <div className="feature-content">
            <div className="feature-tag">Solução</div>
            <h2 className="feature-title">
              Tudo o que precisas numa só plataforma
            </h2>
            <p className="feature-description">
              O Vasse à Praia centraliza toda a informação essencial sobre as praias. 
              Desde condições meteorológicas em tempo real e imagens de webcams de praias relevantes, 
              tudo numa interface intuitiva que te ajuda a tomar a melhor decisão.
            </p>
            <div className="feature-points">
              <div className="point">
                <i className="fa-solid fa-sitemap" style={{ fontSize: '2rem', color: '#FFEB3B' }}></i>
                <span>Previsões, webcams e praias tudo num sitio só</span>
              </div>
              <div className="point">
                <i className="fa-solid fa-umbrella-beach" style={{ fontSize: '2rem', color: '#FFEB3B' }}></i>
                <span>Classificação a partir de previsões em tempo real</span>               
              </div>
              <div className="point">
                <i className="fa-solid fa-video" style={{ fontSize: '2rem', color: '#FFEB3B' }}></i>
                <span>Transmições de webcams em tempo real</span>
              </div>
              <div className="point">
                <i className="fa-solid fa-info" style={{ fontSize: '2rem', color: '#FFEB3B' }}></i>
                <span>Informações sobre infraestruturas e acessibilidade de cada praia</span>
              </div>
            </div>
            <button id="feature-button" className="cta-button" onCLick={onFindBeach}>Vasse à Praia<i className="fa-solid fa-arrow-right" style={{ padding: "0px 0px 0px 8px"}}></i></button>
          </div>
          <div className="feature-image">
            <div className="image-placeholder">
              <div className="placeholder-content">
                <div className="placeholder-icon">📱</div>
                <span>Imagem: Interface da aplicação VasseaPraia</span>
              </div>
            </div>
          </div>
        </div>
        

      </div>
    </section>
  );
};

export default Features;
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import DataContainers from './components/DataContainers/DataContainers';
import Rankings from './components/Rankings/Rankings';
import Footer from './components/Footer/Footer';
import RollingBlock from './components/RollingBlock/RollingBlock';
import InteractiveMap from './components/InteractiveMap/InteractiveMap';
import './App.css';
import { formatDateTime } from './utils/dateUtils';

import logo1 from './assets/images/calheta-municipio-logo.png';
import logo2 from './assets/images/camara-de-lobos-municipio-logo.png';
import logo3 from './assets/images/frente-mar-funchal-logo.png';
import logo4 from './assets/images/funchal-municipio-logo.png';
import logo5 from './assets/images/ipma-logo.png';
import logo7 from './assets/images/madeira-island-logo.png';
import logo6 from './assets/images/sao-vicente-municipio-logo.png';
import logo8 from './assets/images/ilha-do-porto-santo-logo.png';
import Carousel from './components/Carousel/Carousel';

const App = () => {
  const [rankingsData, setRankingsData] = useState(null);
  const [uvData, setUvData] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [seaData, setSeaData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const rankingsContainerRef = useRef(null);

  const [carouselData] = useState([
    { imageUrl: logo1, altText: 'Calheta Município', url: 'https://www.cmcalheta.pt' },
    { imageUrl: logo2, altText: 'Câmara de Lobos Município', url: 'https://cm-camaradelobos.pt/' },
    { imageUrl: logo3, altText: 'Frente Mar Funchal', url: 'https://frentemarfunchal.pt/' },
    { imageUrl: logo4, altText: 'Funchal Município', url: 'https://www.cm-funchal.pt/' },
    { imageUrl: logo5, altText: 'IPMA - Intituto Português do Mar e Atmosfera', url: 'https://www.ipma.pt/' },
    { imageUrl: logo6, altText: 'São Vicente Município', url: 'https://visitsaovicente.pt/' },
    { imageUrl: logo7, altText: 'Madeira Islands', url: 'https://visitmadeira.com/pt' },
    { imageUrl: logo8, altText: 'Ilha do Porto Santo', url: 'https://portosantobiosfera.madeira.gov.pt/pt/'}
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {

        if (entries[0].isIntersecting && !hasLoaded && !isLoading) {
          fetchRankings();
        }
      },
      { threshold: 0.5 }
    );
    
    if (rankingsContainerRef.current) {
      observer.observe(rankingsContainerRef.current);
    }
    
    return () => {
      if (rankingsContainerRef.current) {
        observer.unobserve(rankingsContainerRef.current);
      }
    };
  }, [hasLoaded, isLoading]);

  const fetchRankings = () => {

    if (hasLoaded) {
      const rankingsSection = document.getElementById('rankings-container');
    if (rankingsSection) {
      rankingsSection.scrollIntoView({ behavior: 'smooth' });
    }
    return;
    }

    setIsLoading(true);
    setError(null);
    
    // Rolar para a seção de rankings
    const rankingsSection = document.getElementById('rankings-container');
    if (rankingsSection) {
      rankingsSection.scrollIntoView({ behavior: 'smooth' });
    }

    
    
    // Buscar dados da API
    fetch('/api/rankings')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          setRankingsData(data.rankings);
          setLastUpdated(data.last_updated);
          setUvData(data.uv);
          setWarnings(data.warnings);
          setSeaData(data.sea);
          setHasLoaded(true);
        } else if (data.status === 'empty') {
          setRankingsData({isEmpty: true});
          setLastUpdated(data.last_updated);
          setUvData(data.uv);
          setWarnings(data.warnings);
          setSeaData(data.sea);
          setHasLoaded(true);
        }
        else {
          setError(data.message || 'Erro desconhecido');
        }
        setIsLoading(false);
      })
      .catch(error => {
        setError(`Falha ao carregar rankings: ${error.message}`);
        setIsLoading(false);
      });
  };

  // Função para o botão "Começar"
  const handleFindBeach = () => {
    fetchRankings();
  };

  return (
    <div>
      <Header />
      <Hero onFindBeach={handleFindBeach} />
      <Features />
      <section id="rankings-container" ref = {rankingsContainerRef}>
        {isLoading ? (
          <div className="loading">
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem', color: '#1a73e8' }}></i>
            <p>À procura das melhores praias...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <i className="fas fa-exclamation-triangle" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
            <h3>Erro ao carregar data</h3>
            <p>{error}</p>
            <button className="cta-button" onClick={fetchRankings} 
              style={{ marginTop: '1rem', backgroundColor: '#1a73e8', color: 'white' }}>
              Tentar novamente
            </button>
          </div>
        ) : rankingsData ? (
          <>
            <h2 className="rankings-title">Melhores Sítios para fazer Praia Hoje</h2>
            <div className="rankings-header">
              <p className="update-time">Atualizado às: {formatDateTime(lastUpdated)}</p>
            </div>
            
            <div className="content-wrapper">
              <div className="rankings-wrapper">

                {rankingsData.isEmpty ? (
                  <div className="rankings-empty-state">
                    <div className="placeholder-card">
                      <div className="placeholder-icon">
                        <i className="fas fa-moon"></i> 
                      </div>
                      <h3>Dados em Atualização</h3>
                      <p>Os rankings das praias estão em atualização. Isto acontece normalmente durante a madrugada.</p>
                      <p>Volta de manhã para ver os rankings atualizados!</p>
                      <p className="placeholder-timestamp">
                        Última verificação: {formatDateTime(lastUpdated)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <Rankings 
                    rankingsData={rankingsData} 
                    lastUpdated={lastUpdated} 
                  />
                )}
              </div>
              <div className="data-wrapper">
              <DataContainers 
                warnings={warnings} 
                seaData={seaData} 
                uvData={uvData} 
              />
              </div>
            </div>
          </>
        ) : null}
      </section>
      <section className="carousel-section">
        <div className="container">
          <RollingBlock data={carouselData} />
        </div>
        <InteractiveMap />
        <Carousel />
      </section>
      <Footer />
    </div>
  );
};

export default App;
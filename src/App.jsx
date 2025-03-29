import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import DataContainers from './components/DataContainers/DataContainers';
import Rankings from './components/Rankings/Rankings';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  const [rankingsData, setRankingsData] = useState(null);
  const [uvData, setUvData] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [seaData, setSeaData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchRankings = () => {
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
        } else {
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
      <section id="rankings-container">
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
              <p className="update-time">Atualizado às: {new Date(lastUpdated).toLocaleString()}</p>
            </div>
            <DataContainers 
              warnings={warnings} 
              seaData={seaData} 
              uvData={uvData} 
            />
            <Rankings 
              rankingsData={rankingsData} 
              lastUpdated={lastUpdated} 
            />
          </>
        ) : null}
      </section>
      <Footer />
    </div>
  );
};

export default App;
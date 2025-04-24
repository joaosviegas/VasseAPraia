// BeachCarousel.jsx
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Carousel.css';

// Sample data organized by concelho
const BEACHES_BY_CONCELHO = {
  'Funchal': [
    {
      id: 'praia-formosa',
      title: 'Praia Formosa',
      type: 'Praia de Calhau',
      price: 'free',
      facilities: 'bar, wc, lifeguard',
      description: 'The largest beach in Madeira, featuring black sand and pebbles with crystal clear waters.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'docas-cavacas',
      title: 'Docas do Cavacas',
      type: 'Piscinas naturais',
      price: 'paid',
      facilities: 'bar, wc, showers',
      description: 'Beautiful natural pools formed by volcanic rocks with access to the sea.',
      image: '/api/placeholder/600/300',
      icon: '🌊',
    },
    {
      id: 'praia-paneleiros',
      title: 'Praia dos Paneleiros',
      type: 'Praia escondida',
      price: 'free',
      facilities: 'none',
      description: 'Praia escondida, de difícil acesso, mas com piscina natural e acesso ao mar.',
      image: '/api/placeholder/600/300',
      icon: '🏝️',
    },
    {
      id: 'ponta-gorda',
      title: 'Ponta Gorda',
      type: 'Complexo balnear',
      price: 'paid',
      facilities: 'bar, restaurant, wc, lifeguard',
      description: 'Modern bathing complex with access to the sea via ladders.',
      image: '/api/placeholder/600/300',
      icon: '🏊',
    },
    {
      id: 'clube-naval',
      title: 'Clube Naval do Funchal',
      type: 'Piscinas',
      price: 'paid',
      facilities: 'bar, restaurant, wc, pool',
      description: 'Swimming pools with sea access and various water activities.',
      image: '/api/placeholder/600/300',
      icon: '🚣',
    },
  ],
  'Machico': [
    {
      id: 'praia-machico',
      title: 'Praia de Machico',
      type: 'Praia de Areia',
      price: 'free',
      facilities: 'bar, wc, lifeguard, restaurants',
      description: 'One of the few golden sand beaches in Madeira, with calm waters.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-ribeira-natal',
      title: 'Praia da Ribeira Natal',
      type: 'Praia de Calhau',
      price: 'free',
      facilities: 'none',
      description: 'Small pebble beach with crystal clear waters, perfect for snorkeling.',
      image: '/api/placeholder/600/300',
      icon: '🐠',
    },
  ],
  'Santa Cruz': [
    {
      id: 'praia-palmeiras',
      title: 'Praia das Palmeiras',
      type: 'Praia de Calhau',
      price: 'free',
      facilities: 'bar, wc, restaurants',
      description: 'Pebble beach with excellent facilities and nearby restaurants.',
      image: '/api/placeholder/600/300',
      icon: '🌴',
    },
    {
      id: 'aquaparque',
      title: 'Aquaparque Santa Cruz',
      type: 'Parque aquático',
      price: 'paid',
      facilities: 'slides, pools, bar, restaurant',
      description: 'Water park with slides and pools next to the ocean.',
      image: '/api/placeholder/600/300',
      icon: '🎢',
    },
  ],
  'Câmara de Lobos': [
    {
      id: 'praia-vigario',
      title: 'Praia do Vigário',
      type: 'Praia de Calhau',
      price: 'free',
      facilities: 'bar, wc',
      description: 'Small pebble beach in the picturesque fishing village.',
      image: '/api/placeholder/600/300',
      icon: '🚣',
    },
  ],
  'Ribeira Brava': [
    {
      id: 'praia-ribeira-brava',
      title: 'Praia da Ribeira Brava',
      type: 'Praia de Calhau',
      price: 'free',
      facilities: 'bar, wc, lifeguard',
      description: 'Pebble beach with good facilities and protection from waves.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
  ],
  'Ponta do Sol': [
    {
      id: 'praia-ponta-sol',
      title: 'Praia da Ponta do Sol',
      type: 'Praia de Calhau',
      price: 'free',
      facilities: 'bar, wc, showers',
      description: 'Beautiful pebble beach known for its sunshine and clear waters.',
      image: '/api/placeholder/600/300',
      icon: '☀️',
    },
  ],
  'Calheta': [
    {
      id: 'praia-calheta',
      title: 'Praia da Calheta',
      type: 'Praia de Areia',
      price: 'free',
      facilities: 'bar, restaurant, wc, lifeguard',
      description: 'Man-made golden sand beach with calm waters and marina.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-jardim-mar',
      title: 'Praia do Jardim do Mar',
      type: 'Praia de Calhau',
      price: 'free',
      facilities: 'none',
      description: 'Popular spot for surfers with incredible ocean views.',
      image: '/api/placeholder/600/300',
      icon: '🏄',
    },
  ],
  'Porto Moniz': [
    {
      id: 'piscinas-naturais',
      title: 'Piscinas Naturais',
      type: 'Piscinas naturais',
      price: 'paid',
      facilities: 'bar, wc, changing rooms',
      description: 'Famous natural volcanic pools with stunning views of the Atlantic.',
      image: '/api/placeholder/600/300',
      icon: '🌋',
    },
  ],
  'Santana': [
    {
      id: 'praia-rocha-navio',
      title: 'Praia da Rocha do Navio',
      type: 'Reserva natural',
      price: 'free',
      facilities: 'none',
      description: 'Secluded beach accessible by cable car with natural pools.',
      image: '/api/placeholder/600/300',
      icon: '🚡',
    },
  ],
};

const Carousel = ({ selectedConcelho = 'Funchal' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [beaches, setBeaches] = useState([]);

  useEffect(() => {
    console.log('Selected Concelho in Carousel:', selectedConcelho);
    const selectedBeaches = BEACHES_BY_CONCELHO[selectedConcelho] || [];
    setBeaches(selectedBeaches);
    setCurrentIndex(0);
  }, [selectedConcelho]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, beaches.length - 1));
  };

  // Early return if no beaches available
  if (beaches.length === 0) {
    return <div className="no-beaches">Não foram encontradas praias em {selectedConcelho}</div>;
  }

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === beaches.length - 1;

  return (
    <div className="beach-carousel-container">
      <h2 className="carousel-concelho-title">Praias em {selectedConcelho}</h2>
      
      <div className="carousel-navigation">
        <button 
          className={`carousel-arrow prev ${isAtStart ? 'disabled' : ''}`}
          onClick={handlePrevious}
          disabled={isAtStart}
        >
          <ChevronLeft size={32} />
        </button>
        
        <div className="beach-carousel-track-container">
          <div 
            className="beach-carousel-track" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {beaches.map((beach, index) => (
              <div 
                key={beach.id} 
                className={`beach-carousel-item ${index === currentIndex ? 'active' : ''}`}
              >
                <div className="beach-image">
                  <img src={beach.image} alt={beach.title} />
                </div>
                <div className="beach-content">
                  <div className="beach-header">
                    <div className="beach-icon">{beach.icon}</div>
                    <div className="beach-title-container">
                      <h3 className="beach-title">{beach.title}</h3>
                      <div className="beach-type">{beach.type}</div>
                    </div>
                  </div>
                  
                  <div className="beach-details">
                    {beach.price && (
                      <div className="beach-detail">
                        <span className="detail-icon">💰</span>
                        <span className="detail-text">{beach.price}</span>
                      </div>
                    )}
                    {beach.facilities && (
                      <div className="beach-detail">
                        <span className="detail-icon">🏢</span>
                        <span className="detail-text">{beach.facilities}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="beach-description">{beach.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className={`carousel-arrow next ${isAtEnd ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={isAtEnd}
        >
          <ChevronRight size={32} />
        </button>
      </div>
      
      <div className="carousel-dots">
        {beaches.map((_, index) => (
          <div
            key={index}
            className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
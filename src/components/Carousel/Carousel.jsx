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
      price: 'Grátis',
      facilities: 'wc, lifeguard, food, parking',
      description: 'A maior praia da Madeira, com calhau e areia preta, ideal para um mergulho rápido ou para um passeio na promenade que conecta o Funchal a Câmara de Lobos.',
      image: '/src/assets/images/praia-formosa-1-digitaltravelcouple.jpg',
      icon: '🏖️',
    },
    {
      id: 'docas-cavacas',
      title: 'Docas do Cavacas',
      type: 'Piscinas naturais',
      price: 'Pago',
      facilities: 'bar, wc, showers',
      description: 'Belas piscinas naturais formadas por rochas vulcânicas com acesso direto ao mar.',
      image: '/src/assets/images/madeira_mar_019-andre-carvalho.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-paneleiros',
      title: 'Poça do Governador',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'nenhuma',
      description: 'Também conhecida como Praia dos Paneleiros, é uma enseada secreta e de difícil acesso, mas com piscina natural e águas límpidas.',
      image: 'src/assets/images/FUN2746.jpg',
      icon: '🏝️',
    },
    {
      id: 'ponta-gorda',
      title: 'Ponta Gorda',
      type: 'Complexo balnear',
      price: 'Grátis',
      facilities: 'bar, restaurant, wc, lifeguard',
      description: 'Complexo moderno com escadas de acesso ao mar, ideal para banho e lazer.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'clube-naval',
      title: 'Clube Naval do Funchal',
      type: 'Piscinas',
      price: 'Pago',
      facilities: 'bar, restaurant, pool, wc',
      description: 'Piscinas com acesso ao mar e diversas atividades aquáticas para sócios e visitantes.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-das-gavinas',
      title: 'Praia das Gavinas',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'wc, estacionamento',
      description: 'Pequena praia de calhau, pouco movimentada e ideal para relaxar ao som das ondas.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'lido-velho',
      title: 'Lido Velho',
      type: 'Piscinas naturais',
      price: 'Grátis',
      facilities: 'bar, wc, piscina',
      description: 'Antigo complexo de piscinas naturais com vista para o oceano e serviços de bar.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'lido',
      title: 'Lido',
      type: 'Complexo balnear',
      price: 'Pago',
      facilities: 'bar, restaurant, pool, wc, lifeguard',
      description: 'Moderno complexo de lazer com piscinas, acesso ao mar e infraestruturas para toda a família.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'clube-de-turismo',
      title: 'Clube de Turismo',
      type: 'Piscinas',
      price: 'Pago',
      facilities: 'bar, restaurant, pool, wc',
      description: 'Piscinas em ambiente privado, com serviços de bar e restauração para sócios.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-secreta',
      title: 'Praia Secreta',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'nenhuma',
      description: 'Enseada isolada e de difícil acesso, perfeita para quem procura tranquilidade total.',
      image: '/api/placeholder/600/300',
      icon: '🏝️',
    },
    {
      id: 'praia-nova',
      title: 'Praia Nova',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'wc, estacionamento',
      description: 'Localizada no centro do Funchal, esta praia de calhau está perto de cafés e esplanadas.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-sao-tiago',
      title: 'Praia de S. Tiago (Arsenal)',
      type: 'Complexo balnear',
      price: 'Grátis',
      facilities: 'restaurant, wc, estacionamento, lifeguard',
      description: 'Também chamada Arsenal, combina restaurante de peixe fresco com acesso direto ao mar.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'barreirinha',
      title: 'Barreirinha',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'wc, bar',
      description: 'Pequena praia urbana, muito familiar, com correntes suaves e serviços de bar.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-do-touco',
      title: 'Praia do Touco',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'nenhuma',
      description: 'Praia secreta com acesso por trilho e águas cristalinas, ideal para aventureiros.',
      image: '/api/placeholder/600/300',
      icon: '🏝️',
    },
    {
      id: 'lazareto',
      title: 'Lazareto',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'nenhuma',
      description: 'Enseada preservada com acesso complicado, frequente por quem busca sossego.',
      image: '/api/placeholder/600/300',
      icon: '🏝️',
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

const getFacilityIcons = (facilities) => {
  const facilityIcons = {
    wc: 'fa-solid fa-restroom', // Restroom icon
    lifeguard: 'fa-solid fa-life-ring', // Lifeguard icon
    parking: 'fa-solid fa-square-parking', // Parking icon
    food: 'fa-solid fa-utensils', // Food icon
    shower: 'fa-solid fa-shower', // Shower icon
  };

  return facilities
    .split(',') // Split the string by commas
    .map((facility) => facility.trim()) // Trim whitespace
    .map((facility) => facilityIcons[facility] || '') // Map to FontAwesome classes, fallback to empty string
    .filter((icon) => icon !== ''); // Remove empty strings
};

const Carousel = ({ selectedConcelho = 'Funchal' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [beaches, setBeaches] = useState([]);

  useEffect(() => {
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
                        <i className="fa-solid fa-euro-sign" ></i>
                        <span className="detail-text">{beach.price}</span>
                      </div>
                    )}
                    <div className="beach-detail">
                      {/* Dynamically render FontAwesome icons based on facilities */}
                      {getFacilityIcons(beach.facilities).map((iconClass, idx) => (
                        <i key={idx} className={`detail-icon ${iconClass}`}></i>
                      ))}
                    </div>
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
import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Close the menu on mobile after clicking
  };

  return (
    <header>
      <div className="header-content">
        <a href="/" className="logo">
          <img src="/vasse-a-praia-logo.svg" alt="Vasse à Praia Logo" />
        </a>
        
        {/* Desktop Navigation */}
        <nav className="desktop-menu">
          <ul>
            <li><button onClick={() => handleScroll('features')}>Sobre</button></li>
            <li><button onClick={() => handleScroll('interactive-map')}>Explorar Praias</button></li>
          </ul>
        </nav>
        
        {/* Modern Hamburger Menu for Mobile */}
        <button
          className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
        </button>
        
        {/* Mobile Menu */}
        <nav className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><button onClick={() => handleScroll('features')}>Sobre</button></li>
            <li><button onClick={() => handleScroll('interactive-map')}>Explorar Praias</button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
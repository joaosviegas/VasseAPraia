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
          <img src="/logo.svg" alt="Vasse à Praia Logo" />
        </a>
        {/* Desktop Navigation */}
        <nav className="desktop-menu">
          <ul>
            <li><button onClick={() => handleScroll('features')}>Sobre</button></li>
            <li><button onClick={() => handleScroll('interactive-map')}>Explorar Praias</button></li>
            <li><button onClick={() => handleScroll('contact')}>Contactos</button></li>
          </ul>
        </nav>
        {/* Hamburger Menu for Mobile */}
        <button
          className="hamburger-menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
        <nav className={isMobileMenuOpen ? 'mobile-menu open' : 'mobile-menu'}>
          <ul>
            <li><button onClick={() => handleScroll('features')}>Sobre</button></li>
            <li><button onClick={() => handleScroll('interactive-map')}>Explorar Praias</button></li>
            <li><button onClick={() => handleScroll('contact')}>Contactos</button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
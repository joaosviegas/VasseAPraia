import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <a href="/" className="logo">
          <img src="/logo.svg" alt="Vasse à Praia Logo" />
        </a>
        <nav>
          <ul>
            <li><a href="/" className="active">Home</a></li>
            <li><a href="/sobre">Sobre</a></li>
            <li><a href="/explorar-praias">Explorar Praias</a></li>
            <li><a href="/contactos">Contactos</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
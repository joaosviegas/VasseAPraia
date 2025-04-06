import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <i className="fab fa-github"></i>
        <p>Made with <i className="fas fa-heart heart"></i> by
        <a href="https://github.com/joaosviegas" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color:'#4CAF50'}}>&nbsp;joaosviegas</a></p>
      </div>
      <p>&copy; {new Date().getFullYear()} Vasse à Praia | Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;
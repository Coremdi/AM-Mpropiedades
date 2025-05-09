import React from 'react';
import { FaLinkedin, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="social-icons">
        <a href="https://linkedin.com/company/AM&M" target="_blank" rel="noopener noreferrer">
          <FaLinkedin /> 
        </a>
        <a href="https://instagram.com/AM&M" target="_blank" rel="noopener noreferrer">
          <FaInstagram /> 
        </a>
        <a href="https://x.com/AM&M" target="_blank" rel="noopener noreferrer">
          <FaXTwitter /> 
        </a>
      </div>
      <div className="footer-divider"></div>
      <p className="footer-text">© {new Date().getFullYear()} AM&M propiedades. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
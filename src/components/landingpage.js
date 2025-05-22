import React from 'react';
import './landingpage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Bienvenido a AM&M Propiedades</h1>
      <h2 className="landing-subtitle">Donde cada propiedad encuentra su propósito</h2>
      <Link to="/house-screener" className="buynrent-button">
        Encontrá la tuya
      </Link>
    </div>
  );
};

export default LandingPage;
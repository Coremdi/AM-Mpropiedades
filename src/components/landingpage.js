import React from 'react';
import './landingpage.css';
import { Link } from 'react-router-dom'; // Assuming you're using react-router

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h2 className="buynrent-title">
        Bienvenido a AM&M Propiedades, donde cada propiedad encuentra su propósito.
      </h2>
      <Link to="/house-screener" className="buynrent-button">
        Encontrá la tuya
      </Link>
    </div>
  );
};
 
export default LandingPage;
import React from 'react';
import './buynrent.css';
import { Link } from 'react-router-dom'; // Assuming you're using react-router

const BuyNRent = () => {
  return (
    <div className="buynrent-container">
      <h2 className="buynrent-title">
        Bienvenido a AM Propiedades, donde cada propiedad encuentra su propósito.
      </h2>
      <Link to="/house-screener" className="buynrent-button">
        Encontrá la tuya
      </Link>
    </div>
  );
};

export default BuyNRent;
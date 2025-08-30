import React from 'react';
import './underconstruction.css';
import { FaTools, FaHardHat } from 'react-icons/fa';

const UnderConstruction = () => {
  return (
    <div className="under-construction-container">
      <div className="under-construction-card">
        <FaHardHat className="construction-icon" />
        <h1>Pagina en Construccion</h1>
        <p>Estamos trabajando para lanzar esta funcionalidad. ¡Pronto estará disponible!</p>
        <FaTools className="tools-icon" />
      </div>
    </div>
  );
};

export default UnderConstruction;

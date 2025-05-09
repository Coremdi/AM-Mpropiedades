import React from 'react';
import './propertycard.css';
import ImageSlider from './imageslider'; // Import it!
import { FaBed, FaBath, FaHome, FaRulerCombined } from 'react-icons/fa';



const PropertyCard = ({ property }) => {
  return (
      <div className="property-card"  onClick={() => window.location.href = `/property/${property.id}`}>

      <div onClick={(e) => e.stopPropagation()}>
    <ImageSlider images={property.images} title={property.title} />
  </div>


          <div className="property-info">
          <h3>{property.title}</h3>
          <p>{property.location}</p>
          <p><strong>USD {property.price.toLocaleString()}</strong></p>

          <div className="property-info-divider"></div>

          <div className="info-item">
            <FaBed /> {property.bedrooms} dormitorios
          </div>
          <div className="info-item">
            <FaBath /> {property.bathrooms} baños
          </div>
          <div className="info-item">
            <FaHome /> Tipo: {property.type}
          </div>
          <div className="info-item">
            <FaRulerCombined /> Sup: {property.superficie} m²
          </div>
        </div>

      </div>

  );
};
export default PropertyCard;
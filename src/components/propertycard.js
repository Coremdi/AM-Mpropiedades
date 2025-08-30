import React from 'react';
import './propertycard.css';
import { useNavigate } from "react-router-dom";
import ImageSlider from './imageslider'; // Import it!
import { FaBed, FaBath, FaHome, FaRulerCombined } from 'react-icons/fa';
import { useAuth } from "./adminpanel/authcontext"; // Adjust path if needed




const PropertyCard = ({ property, onDelete, onEdit }) => {

  const navigate = useNavigate();
  const { isAdmin } = useAuth(); // 👈

  //const defaultEdit = (id) => alert(`Editar propiedad ${id} (aún no implementado)`);
  const defaultDelete = (id) => alert(`Eliminar propiedad ${id} (aún no implementado)`);


    const handleCardClick = () => {
    navigate(`/property/${property.id}`);            // ← always navigate
  };
  return (
      <div className="property-card"  onClick={handleCardClick}>

        {/* Status Badge */}
      {property.status && (
        <div className={`property-status ${property.status.toLowerCase()}`}>
          {property.status}
        </div>
      )}

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

           {/* Admin Controls */}
        {isAdmin && (
          <div className="admin-actions">
            <button className="edit-button" onClick={(e) => { e.stopPropagation(); navigate(`/admin/edit-property/${property.id}`); }}>✏️ Editar</button>
            <button className="delete-button" onClick={(e) => {    e.stopPropagation();    onDelete(property.id);   }}>🗑️ Eliminar</button>
          </div>
        )}
        </div>

      </div>

  );
};
export default PropertyCard;
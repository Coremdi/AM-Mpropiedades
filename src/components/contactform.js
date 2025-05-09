import React, { useState } from 'react';
import './contactform.css';

const ContactFormModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    location: '',
    operation: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // OPTIONAL: send via an API or integrate with emailjs / formspree
    console.log("Sending form data:", formData);

    alert("¡Gracias por contactarnos! Pronto nos comunicaremos.");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Contáctanos</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input type="text" name="location" placeholder="Ubicación de la propiedad" onChange={handleChange} required />
          
          <select name="operation" onChange={handleChange} required>
            <option value="">Operación</option>
            <option value="alquilar">Alquilar</option>
            <option value="tasar">Tasar</option>
            <option value="tasar">Vender</option>
          </select>

          <select name="Tipo de propiedad" onChange={handleChange} required>
            <option value="">Tipo de propiedad</option>
            <option value="casa">Casa</option>
            <option value="ph">PH</option>
            <option value="departamento">Departamento</option>
            <option value="local">Local</option>
            <option value="lote">Lote</option>
          </select>

          <select name="Ambientes" onChange={handleChange} required>
            <option value="">Ambientes</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="+4">+4</option>
          </select>
          <input type="supcub" name="supCub" placeholder="Superficie Cubierta" onChange={handleChange} required />
          <input type="suptot" name="supTot" placeholder="Superficie Total" onChange={handleChange} required />
          <input type="cochera" name="cochera" placeholder="Cochera" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
          <input type="text" name="firstName" placeholder="Nombre" onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Apellido" onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Teléfono móvil" onChange={handleChange} required />
          
          <button type="submit">Enviar</button>
        </form>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default ContactFormModal;
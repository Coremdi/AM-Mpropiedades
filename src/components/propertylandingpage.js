import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaWhatsapp, FaEnvelope, FaArrowLeft, FaBed, FaBath, FaHome, FaRulerCombined } from "react-icons/fa";
import "./propertylandingpage.css";
import propertiesData from './properties.json';
import FullScreenSlider from "./fullscreenslider"; // Import new component




const PropertyLandingPage = () => {
  const { id } = useParams(); // Get property ID from URL
  const [property, setProperty] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const [showSlider, setShowSlider] = useState(false);
  const [sliderStartIndex, setSliderStartIndex] = useState(0);
  const [selectedAlerts, setSelectedAlerts] = useState([]);


  useEffect(() => {
    // Fetch the property data based on ID (simulate API call)
    //const fetchProperty = async () => {
      // Replace this with your real API call
     // const data = await fetch(`/api/properties/${id}`).then(res => res.json());
      //setProperty(data);
      const foundProperty = propertiesData.find((prop) => prop.id.toString() === id);
      setProperty(foundProperty); 
    }, [id]);

  //const handleSubscribe = async () => {
    //if (!email) return;
    // Send the subscription to your backend (mocked here)
    //await fetch("/api/subscribe-price-alert", {
      //method: "POST",
      //headers: { "Content-Type": "application/json" },
      //body: JSON.stringify({ email, propertyId: id }),
    //});
    //setSubscribed(true);
  //};
  const handleSubscribe = () => {
    if (!email || !selectedAlerts) {
      alert('Por favor seleccione un tipo de alerta y su correo.');
      return;
    }
    // Your subscription logic here
    setSubscribed(true);
  };

  if (!property) return <p>Cargando propiedad...</p>;

  const whatsappMessage = `Hola, estoy interesado en la propiedad: ${window.location.href}. ¿Podrían brindarme más detalles?`;
  const whatsappLink = `https://wa.me/5492616086463?text=${encodeURIComponent(whatsappMessage)}`;

  const mailSubject = `Consulta sobre la propiedad: ${property.title}`;
  const mailBody = `Hola,\n\nEstoy interesado en la propiedad: ${window.location.href}. ¿Podrían brindarme más información?\n\nGracias.`;

  return (
    <>

    <div className="property-landing-container">
       <Link to="/house-screener" className="back-button">
        <FaArrowLeft style={{ marginRight: '8px' }} />
        Volver
      </Link>

      <div className="property-images-grid">
        <div className="main-image">
          {property.images[0] && (
            <img src={property.images[0]} alt="Propiedad principal"  onClick={() => { setShowSlider(true); setSliderStartIndex(0); }} />
          )}
        </div>
        <div className="side-images">
          {property.images[1] && (
            <img src={property.images[1]} alt="Propiedad secundaria 1" onClick={() => { setShowSlider(true); setSliderStartIndex(1); }}/>
          )}
          {property.images[2] && (
            <img src={property.images[2]} alt="Propiedad secundaria 2" onClick={() => { setShowSlider(true); setSliderStartIndex(2); }}/>
          )}
        </div>
      </div>

      <h1 className="property-title">{property.title}</h1>
      <p className="property-price">  
        {new Intl.NumberFormat('de-DE').format(property.price)} US$
      </p>

      
      <div className="property-description">
        <h2>Descripción</h2>
        <p>{property.description}</p>
      </div>

      <div className="property-details">
        <h2>Detalles de la Propiedad</h2>
        <div className="details-row">
          <div className="detail-item">
            <FaBed className="detail-icon" />
            <span>{property.bedrooms} dormitorios</span>
          </div>
          <div className="detail-item">
            <FaBath className="detail-icon" />
            <span>{property.bathrooms} baños</span>
          </div>
          <div className="detail-item">
            <FaHome className="detail-icon" />
            <span>Tipo: {property.type}</span>
          </div>
          <div className="detail-item">
            <FaRulerCombined className="detail-icon" />
            <span>Sup: {property.superficie} m²</span>
          </div>
        </div>
      </div>

      <div className="property-amenities">
        <h2>Comodidades</h2>
        <div className="amenities-tags">
          {property.amenities.map((amenity, index) => (
            <span key={index} className="amenity-tag">{amenity}</span>
          ))}
        </div>
      </div>

      <div className="contact-actions">
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-icon whatsapp">
          <FaWhatsapp /> Contáctanos por WhatsApp
        </a>
        <a
          href={`mailto:amympropiedades@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`}
          className="contact-icon email"
        >
          <FaEnvelope /> Contáctanos por Email
        </a>
      </div>

      <div className="price-alert">
  <h3>¿Desea recibir algún tipo de alerta?</h3>
  {!subscribed ? (
    <div className="alert-form">
      <div className="alert-selector">
        <h4>Seleccione las alertas:</h4>
        <div className="alert-options">
          {['Cambio de precio', 'Cambio de estado', 'Disponibilidad'].map((alert) => (
            <span
              key={alert}
              className={`alert-option ${selectedAlerts.includes(alert) ? 'selected' : ''}`}
              onClick={() => {
                if (selectedAlerts.includes(alert)) {
                  // remove if already selected
                  setSelectedAlerts(selectedAlerts.filter((item) => item !== alert));
                } else {
                  // add if not selected
                  setSelectedAlerts([...selectedAlerts, alert]);
                }
              }}
            >
              {alert}
            </span>
          ))}
        </div>
      </div>

      {selectedAlerts.length > 0 && (
        <div className="selected-tags">
          <h4>Alertas seleccionadas:</h4>
          {selectedAlerts.map((alert, index) => (
            <span key={index} className="tag">{alert}</span>
          ))}
        </div>
      )}

      <input
        type="email"
        placeholder="Ingrese su correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSubscribe}>Suscribirse</button>
    </div>
  ) : (
    <p>¡Te has suscrito para recibir alertas!</p>
  )}
</div>
    </div>
          {showSlider && (
            <FullScreenSlider 
              images={property.images} 
              startIndex={sliderStartIndex} 
              onClose={() => setShowSlider(false)} 
            />
          )}
          </>
  );
};

export default PropertyLandingPage;

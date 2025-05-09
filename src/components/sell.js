import React, {useState} from "react";
import { FaUserTie, FaDollarSign, FaReceipt } from "react-icons/fa";
import "./sell.css";
import ContactFormModal from "./contactform"; // Adjust path as needed


const Sell = () => {

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="sell-container">
         <hr className="sell-divider" />
   
         <div className="sell-content">
           <div className="sell-text">
             <h2>¿Por qué elegirnos para vender su propiedad?</h2>
             <p>
                Vender una propiedad con éxito requiere experiencia, dedicación y estrategia. 
                Nuestro equipo entiende tanto el valor emocional como comercial de su inmueble. 
                Gracias a nuestras soluciones de marketing personalizadas, conectamos su propiedad con los compradores adecuados para lograr el mejor precio posible.
             </p>
           </div>
         </div>
   
         <div className="sell-section">
           <div className="sell-column">
             <FaUserTie className="sell-icon consulting-icon" />
             <h3>Asesoramiento calificado</h3>
             <p>
                Confíe en especialistas que conocen el mercado y lo guiarán en cada etapa del proceso.
             </p>
           </div>
   
           <div className="sell-column">
             <FaDollarSign className="sell-icon money-icon" />
             <h3>Valoración estratégica</h3>
             <p>
                Le ofrecemos una tasación precisa respaldada por datos actuales para potenciar su ganancia.
             </p>
           </div>
   
           <div className="sell-column">
             <FaReceipt className="sell-icon transparency-icon" />
             <h3>Transparencia garantizada</h3>
             <p>
                Información clara y actualizada en todo momento: sin sorpresas, sin letra chica.
             </p>
           </div>
         </div>
         {/* Always visible Contact button */}
      <div className="sell-contact-button-container">
        <button className="contactanos-btn" onClick={() => setShowModal(true)}>
          Contáctanos
        </button>
      </div>

      {showModal && <ContactFormModal onClose={() => setShowModal(false)} />}
         
       </div>
  );
};

export default Sell;
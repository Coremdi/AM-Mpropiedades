import React from "react";
import { Typewriter } from "react-simple-typewriter";
import "./landingpage.css";
import { Link } from 'react-router-dom'; // Assuming you're using react-router

/*me gsta este efecto para botones*//*https://ibelick.com/blog/creating-metallic-effect-with-css*/
/*hacer un hero slider para los beneficios que estan en el classname de features, despues meter el widget de conexion*/
const LandingPage = () => {
    return (
      <div className="landing-container">
        <div className="hero-content">
          <h1>AM&M Propiedades</h1>
          <h2 className="about-heading">
          <Typewriter
            words={["Donde tus sueños encuentran hogar\nEn el corazón de Luján de Cuyo"]}
            loop={false}
            cursor={false}
            typeSpeed={100}
            deleteSpeed={1000000000000}
            delaySpeed={1000000000}
          />
        </h2>          
        <Link to="/house-screener" className="cta-button">
          <span>Encontralo Ahora</span>
        </Link>
        </div>  
      </div>
    );
  };
  
  export default LandingPage;
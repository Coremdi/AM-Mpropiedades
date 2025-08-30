import React from "react";
import { FaLightbulb, FaHeart, FaHandsHelping } from "react-icons/fa";
import "./about.css";

const About = () => {
  return (
    <div className="about-container">
      <hr className="about-divider" />

      <div className="about-content">
        <div className="about-text">
          <h2>Nuestra esencia en AM&M Propiedades</h2>
          <p>
            En AM&M Propiedades vivimos y respiramos el mundo inmobiliario.
            Nuestra historia está marcada por una profunda pasión por los bienes raíces y por un compromiso constante con la excelencia.
            A lo largo del tiempo, hemos construido una trayectoria sólida y confiable, guiando a nuestros clientes en la compra, venta y alquiler de inmuebles residenciales y comerciales con un enfoque personalizado.
            <br /><br />
            Creemos que el éxito se construye sobre relaciones de confianza, y esa es nuestra mayor motivación.
            Nuestro equipo está conformado por profesionales con vocación de servicio, quienes comparten los valores que definen a AM Propiedades: Inclusividad, pericia y una auténtica pasión por lo que hacemos.
          </p>
        </div>
      </div>

      <div className="values-section">
        <div className="value-column">
          <div className="icon-circle competence-icon">
            <FaLightbulb />
          </div>
          <h3>Pericia</h3>
          <p>
            Años de experiencia y conocimiento del mercado para asesorarte con inteligencia y precisión.
          </p>
        </div>
        <div className="value-column">
          <div className="icon-circle inclusivity-icon">
            <FaHandsHelping />
          </div>
          <h3>Inclusividad</h3>
          <p>
            Encontramos la propiedad ideal para cada persona, sin importar su origen o situación. Todos son bienvenidos en AM Propiedades.
          </p>
        </div>
        <div className="value-column">
          <div className="icon-circle passion-icon">
            <FaHeart />
          </div>
          <h3>Pasión</h3>
          <p>
            Amamos lo que hacemos y lo demostramos en cada detalle y atención que brindamos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

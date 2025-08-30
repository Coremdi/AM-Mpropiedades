import React, { useState, useEffect } from 'react';
import logo from '../assets/AMpropiedades.ico';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ scrollToSection, refs }) => {
  const { landingpageRef, aboutRef, testimonialsRef, sellRef } = refs;
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const handleScroll = (ref) => {
    if (location.pathname === '/' && ref?.current) {
      scrollToSection(ref);
      setMobileMenuOpen(false); 
    }
  };
  

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Stockify Logo" className="navbar-logo" />
        <span className="company-name">AM&M</span>
      </div>

      <div className="navbar-center">
        <Link to="/" onClick={() => handleScroll(landingpageRef)}><button>Inicio</button></Link>
        <Link to="/" onClick={() => handleScroll(aboutRef)}><button>Nosotros</button></Link>
        <Link to="/house-screener"><button>Propiedades</button></Link>
        <Link to="/" onClick={() => handleScroll(sellRef)}><button>Vender</button></Link>
        <Link to="/" onClick={() => handleScroll(testimonialsRef)}><button>Testimonios</button></Link>
      </div>

      <div className="navbar-right">
        <div className="hamburger" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </div>
      </div>

      {isMobileMenuOpen && (
  <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
    <div
      className="mobile-menu"
      onClick={(e) => e.stopPropagation()} 
    >
      <Link to="/" onClick={() => handleScroll(landingpageRef)}>Inicio</Link>
      <Link to="/" onClick={() => handleScroll(aboutRef)}>Nosotros</Link>
      <Link to="/house-screener">Propiedades</Link>
      <Link to="/" onClick={() => handleScroll(sellRef)}>Vender</Link>
      <Link to="/" onClick={() => handleScroll(testimonialsRef)}>Testimonios</Link>
    </div>
  </div>
      )}
    </nav>
  );
};

export default Navbar;

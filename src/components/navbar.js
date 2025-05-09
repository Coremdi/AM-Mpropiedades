import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ scrollToSection, refs }) => {
  const { landingpageRef, aboutRef, testimonialsRef, buynrentRef, sellRef/*, contactRef*/ } = refs;
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
      setMobileMenuOpen(false); // Close mobile menu after click
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
        <Link to="/" onClick={() => handleScroll(buynrentRef)}><button>Comprar&Alquilar</button></Link>
        <Link to="/" onClick={() => handleScroll(sellRef)}><button>Vender</button></Link>
        <Link to="/" onClick={() => handleScroll(testimonialsRef)}><button>Testimonios</button></Link>
        {/*<Link to="/" onClick={() => handleScroll(contactRef)}><button>Contactanos</button></Link>*/}
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
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
    >
      <Link to="/" onClick={() => handleScroll(landingpageRef)}>Inicio</Link>
      <Link to="/" onClick={() => handleScroll(aboutRef)}>Nosotros</Link>
      <Link to="/" onClick={() => handleScroll(buynrentRef)}>Comprar&Alquilar</Link>
      <Link to="/" onClick={() => handleScroll(sellRef)}>Vender</Link>
      <Link to="/" onClick={() => handleScroll(testimonialsRef)}>Testimonios</Link>
      {/*<Link to="/" onClick={() => handleScroll(contactRef)}>Contactanos</Link>*/}
    </div>
  </div>
      )}
    </nav>
  );
};

export default Navbar;

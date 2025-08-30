import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/AMpropiedades.ico';
import './adminnavbar.css';

const AdminNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const isActive = (path) => location.pathname.includes(path);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="AM&M Logo" className="navbar-logo" />
        <span className="company-name">AM&M Admin</span>
      </div>

      <div className="navbar-center">
        <Link to="/admin/manage-listings" className={isActive('manage-listings') ? 'active' : ''}>
          <button>Propiedades</button>
        </Link>
        <Link to="/admin/clientes" className={isActive('clientes') ? 'active' : ''}>
          <button>Clientes</button>
        </Link>
        <Link to="/admin/metricas" className={isActive('metricas') ? 'active' : ''}>
          <button>Métricas</button>
        </Link>
      </div>

      <div className="navbar-right">
        <div className="hamburger" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <Link to="/admin/manage-listings">Propiedades</Link>
            <Link to="/admin/clientes">Clientes</Link>
            <Link to="/admin/metricas">Métricas</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;

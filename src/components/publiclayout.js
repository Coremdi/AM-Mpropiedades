import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import './publiclayout.css';  // import your CSS file

const PublicLayout = ({ children, scrollToSection, refs }) => {
  return (
    <>
      <Navbar scrollToSection={scrollToSection} refs={refs} />
      <div className="public-layout-container">
        {children}
        <Footer />
      </div>
    </>
  );
};

export default PublicLayout;

import './App.css';
import Navbar from './components/navbar';
import LandingPage from './components/landingpage';
import About from './components/about';
import Testimonials from './components/testimonials';
//import BuyNRent from './components/buynrent';
import Sell from './components/sell';
//import Contact from './components/contact';
import Footer from './components/footer';
import HouseScreener from './components/housescreener';
import PropertyLandingPage from './components/propertylandingpage';
import React, {useRef} from 'react';
import { BrowserRouter as Router, Routes, Route/*, Link*/ } from 'react-router-dom';


const App = () => {
  const landingpageRef = useRef(null);
  const aboutRef = useRef(null);
  const testimonialsRef = useRef(null);
  //const buynrentRef = useRef(null);
  const sellRef = useRef(null);
  //const contactRef = useRef(null);
  const footerRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80, // Adjust for navbar height
        behavior: 'smooth',
      });
    }
  };
 
 return (
   <Router>
      <div>
        <Navbar
          scrollToSection={scrollToSection}
          refs={{ landingpageRef, aboutRef, testimonialsRef, /*buynrentRef,*/ sellRef, /*contactRef,*/ footerRef }}
        />
        <div style={{ marginTop: '8px', padding: '20px' }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section ref={landingpageRef}>
                    <LandingPage/>
                  </section>
                  <section ref={aboutRef}>
                    <About />
                  </section>
                  {/*<section ref={buynrentRef}>
                    <BuyNRent />
                  </section>*/}
                  <section ref={sellRef}>
                    <Sell />
                  </section> 
                  <section ref={testimonialsRef}>
                    <Testimonials />
                  </section>  
                 {/* <section ref={contactRef}>
                    <Contact />
                  </section>*/}
                  <section ref={footerRef}>
                    <Footer />
                  </section>
                </>
              }
            />
            <Route path="/house-screener" element={<HouseScreener />} />
            <Route path="/property/:id" element={<PropertyLandingPage />} />
           </Routes>
        </div>
      </div>
    </Router>
 );
};

export default App;
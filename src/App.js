import './App.css';
import React, { useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./components/adminpanel/protectedroute";

// Lazy load less-used pages for performance
const AdminLayout = lazy(() => import('./components/adminlayout'));
const PublicLayout = lazy(() => import('./components/publiclayout'));
const LandingPage = lazy(() => import('./components/landingpage'));
const About = lazy(() => import('./components/about'));
const Testimonials = lazy(() => import('./components/testimonials'));
const Sell = lazy(() => import('./components/sell'));
const HouseScreener = lazy(() => import('./components/housescreener'));
const PropertyLandingPage = lazy(() => import('./components/propertylandingpage'));
const AdminLogin = lazy(() => import('./components/adminpanel/adminlogin'));
const AdminLandingPage = lazy(() => import('./components/adminpanel/adminlandingpage'));
const ManageListings = lazy(() => import('./components/adminpanel/housescreeneradmin'));
const EditPropertyPage = lazy(() => import('./components/adminpanel/editpropertypage'));
const CreateProperty = lazy(() => import('./components/adminpanel/createproperty'));
const UnderConstruction = lazy(() => import('./components/adminpanel/underconstruction'));
const ResetPassword = lazy(() => import('./components/adminpanel/resetpassword'));
const ForgotPassword = lazy(() => import('./components/adminpanel/forgotpassword'));

export default function App() {
  const landingpageRef = useRef(null);
  const aboutRef = useRef(null);
  const testimonialsRef = useRef(null);
  const sellRef = useRef(null);
  const footerRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref?.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const refs = { landingpageRef, aboutRef, testimonialsRef, sellRef, footerRef };

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <PublicLayout scrollToSection={scrollToSection} refs={refs}>
                <main>
                  <section ref={landingpageRef}><LandingPage /></section>
                  <section ref={aboutRef}><About /></section>
                  <section ref={sellRef}><Sell /></section>
                  <section ref={testimonialsRef}><Testimonials /></section>
                  <section ref={footerRef}></section>
                </main>
              </PublicLayout>
            }
          />
          <Route
            path="/house-screener"
            element={
              <PublicLayout scrollToSection={scrollToSection} refs={refs}>
                <HouseScreener />
              </PublicLayout>
            }
          />
          <Route
            path="/property/:id"
            element={
              <PublicLayout scrollToSection={scrollToSection} refs={refs}>
                <PropertyLandingPage />
              </PublicLayout>
            }
          />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminLogin />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="adminlandingpage" element={<ProtectedRoute><AdminLandingPage /></ProtectedRoute>} />
            <Route path="manage-listings" element={<ProtectedRoute><ManageListings /></ProtectedRoute>} />
            <Route path="edit-property/:id" element={<ProtectedRoute><EditPropertyPage /></ProtectedRoute>} />
            <Route path="new-property" element={<ProtectedRoute><CreateProperty /></ProtectedRoute>} />
            <Route path="metricas" element={<ProtectedRoute><UnderConstruction /></ProtectedRoute>} />
            <Route path="clientes" element={<ProtectedRoute><UnderConstruction /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

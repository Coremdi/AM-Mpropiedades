import React from "react";
import { FaBuilding, FaUsers, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import "./adminlandingpage.css";
import { useNavigate } from "react-router-dom"; // <-- import this
import { useAuth } from "./authcontext"; // import the context


const AdminLandingPage = () => {
  const navigate = useNavigate(); // <-- initialize here
  const { logout } = useAuth(); // get logout from context

    
  const handleLogout = async () => {
    try {
      await logout(); // call backend logout + clear context
      navigate("/admin"); // redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="admin-landing-container">
      <header className="admin-header">
        <h1>🏡 Panel de Control</h1>
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Cerrar Sesion
        </button>
      </header>

      <main className="admin-main">
        <section className="admin-card">
          <FaBuilding className="admin-icon" />
          <h2>Maneja tus propiedades</h2>
          <p>Altas, Bajas y Modificaciones de propiedades</p>
          <button className="admin-action-button" onClick={() => navigate("/admin/manage-listings")}>Administrar Propiedades</button>
        </section>

        <section className="admin-card">
          <FaUsers className="admin-icon" />
          <h2>Clientes</h2>
          <p>View leads, buyer/seller info, and communication logs.</p>
          <button className="admin-action-button" onClick={() => navigate("/admin/clientes")}>Ver Clientes</button>
        </section>

        <section className="admin-card">
          <FaChartLine className="admin-icon" />
          <h2>Metricas</h2>
          <p>Traqueo de metricas</p>
          <button className="admin-action-button"  onClick={() => navigate("/admin/metricas")}>Ver reportes</button>
        </section>
      </main>

      <footer className="admin-footer">
        © {new Date().getFullYear()} AM&M Propiedades Admin Dashboard
      </footer>
    </div>
  );
};

export default AdminLandingPage;


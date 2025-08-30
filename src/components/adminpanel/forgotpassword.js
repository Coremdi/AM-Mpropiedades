import React, { useState } from "react";
import './resetnforgotpassword.css';
import API_URL from "../../config"; // Import API_URL



const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/admin/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Si existe una cuenta con este correo, recibirás un enlace de recuperación.");
      } else {
        setMessage(data.message || "Error al solicitar recuperación.");
      }
    } catch (error) {
      setMessage("Error de red. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">

        <h2>Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar enlace"}
          </button>
        </form>
        {message && <p>{message}</p>}
    </div>
  </div>

  );
};

export default ForgotPassword;

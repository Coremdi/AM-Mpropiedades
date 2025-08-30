import React, { useState } from "react";
import "./adminlogin.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authcontext"; // adjust if needed
import { Link } from "react-router-dom";



const AdminLogin = () => {
  const navigate = useNavigate(); // <-- initialize here
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { login } = useAuth();


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!username || !password) {
    setError("Please enter both username and password.");
    return;
  }

  setError("");
  setSuccessMessage("");
  setLoading(true);

  try {
      const success = await login(username.trim(), password.trim());

    if (success) {
        navigate("/admin/adminlandingpage");
    } else {
      setError("Invalid username or password.");
    }
  } catch (err) {
    console.error("Catch block triggered:", err);
    setError("Network error, please try again later.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="admin-login-container">
      <div className="login-card">
        <h2 className="login-title">Admin Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p className="login-error">{error}</p>}
          {successMessage && <p className="login-success">{successMessage}</p>}

          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-options">
            <Link to="/admin/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

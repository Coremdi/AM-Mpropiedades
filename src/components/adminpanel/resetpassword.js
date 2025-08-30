import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import './resetnforgotpassword.css';
import API_URL from "../../config"; // Import API_URL

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/admin/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, new_password: password }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/admin"), 2000);
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">

        <h2>Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />{" "}
            Show Password
          </label>
          <button type="submit">Update Password</button>
        </form>
        {message && <p>{message}</p>}
        </div>

    </div>
  );
};

export default ResetPassword;

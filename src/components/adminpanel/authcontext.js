import React, { createContext, useContext, useEffect, useState } from "react";
import API_URL from "../../config"; // Import API_URL


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Check backend for session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/status`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Backend returned error");
        const data = await res.json();
        setIsAdmin(Boolean(data.is_admin));
      } catch (err) {
        console.error("Session check failed:", err);
        setError("Unable to verify session.");
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) return false;
      setIsAdmin(true);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/admin/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsAdmin(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAdmin, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

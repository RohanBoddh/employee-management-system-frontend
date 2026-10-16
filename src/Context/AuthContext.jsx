import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_BASE_URL } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user"); // ✅ CHANGED
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // ✅ On mount, mark loading false
  useEffect(() => setLoading(false), []);

  // ✅ Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/login`,
        { email, password }
      );

      const loggedUser = {
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role || "Employee",
        position: res.data.position || "Employee",
        access: res.data.access || [],
      };

      setUser(loggedUser);
      sessionStorage.setItem("user", JSON.stringify(loggedUser)); // ✅ CHANGED

      return loggedUser;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Signup function (no change needed)
  const signup = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/signup`,
        { email, password }
      );
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user"); // ✅ CHANGED
  };

  // ✅ Fetch full user profile (optional)
  const fetchUser = async () => {
    if (!user?.id) return null;
    try {
      const res = await axios.get(
        `${API_BASE_URL}/users/${user.id}`
      );
      setUser(res.data);
      sessionStorage.setItem("user", JSON.stringify(res.data)); // ✅ CHANGED
      return res.data;
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      return user;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, fetchUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => useContext(AuthContext);

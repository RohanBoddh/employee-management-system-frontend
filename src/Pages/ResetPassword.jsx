import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, BACKEND_URL } from "../services/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    try {
      // Try /api/auth/reset-password or root /reset-password
      await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        token,
        password,
      });
      alert("Password reset successful");
      navigate("/");
    } catch {
      try {
        await axios.post(`${BACKEND_URL}/reset-password`, {
          token,
          password,
        });
        alert("Password reset successful");
        navigate("/");
      } catch {
        alert("Invalid or expired link");
      }
    }
  };

  return (
    <div className="fp-container">
      <div className="fp-card">
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleReset}>Reset Password</button>
      </div>
    </div>
  );
};

export default ResetPassword;

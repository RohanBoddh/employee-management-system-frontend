import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../services/api";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();

try {
  await axios.post(
    `${API_BASE_URL}/auth/forgot-password`,
    { email }
  );

  alert("Reset link generated. Check backend console 🔗");
  navigate("/email-sent", { state: { email } });

} catch (err) {
  if (err.response?.data?.message) {
    alert(err.response.data.message);
  } else {
    alert("Email not registered ❌");
  }
};
  };

  return (
    <div className="fp-container">
      {" "}
      <div className="fp-card">
        {" "}
        <h2>Forgot your Password?</h2>{" "}
        <p>Enter your email address to receive a password reset link.</p>
        <form onSubmit={handleSend}>
          <input
            type="email"
            placeholder="Email address*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

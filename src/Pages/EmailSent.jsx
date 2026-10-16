import React from "react";
import { useLocation } from "react-router-dom";
import "./EmailSent.css";

const EmailSent = () => {
  const { state } = useLocation();
  const email = state?.email;

  return (
    <div className="sent-container">
      <div className="sent-card">
        <h2>Check your email</h2>

        <p>
          We have sent the link to reset your password at <br />
          <b>{email}</b>
        </p>

        <p className="small">
          Didn’t receive the email yet?
          <br />
          Please check your spam folder, or resend the email.
        </p>

        <button onClick={() => window.location.reload()}>
          Resend Email
        </button>
      </div>
    </div>
  );
};

export default EmailSent;

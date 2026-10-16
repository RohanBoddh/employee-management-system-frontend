import React, { useState } from "react";
import { API_BASE_URL } from "../services/api";
import "./HelpCenter.css";

const HelpCenter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_BASE_URL}/support/submit-report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, issue }),
        }
      );

      const data = await response.json();
      alert(data.message);

      // Reset form
      setName("");
      setEmail("");
      setIssue("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="help-page">
      <div className="help-container">
        <h1 className="help-title">Help Center</h1>

        <h2 className="section-title">Frequently Asked Questions</h2>

        <div className="faq-item">
          <h4>1. How to add a new employee?</h4>
          <p>
            Go to Dashboard → Click on "Add Employee" → Fill details → Submit.
          </p>
        </div>

        <div className="faq-item">
          <h4>2. How to edit employee details?</h4>
          <p>
            Click on Edit button next to employee record → Update details →
            Save.
          </p>
        </div>

        <div className="faq-item">
          <h4>3. Forgot Password?</h4>
          <p>
            Click on "Forgot Password" on login page and follow instructions.
          </p>
        </div>

        <hr className="help-divider" />

        <h2 className="section-title">Contact Support</h2>

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            placeholder="Your Name"
            className="contact-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            className="contact-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <textarea
            placeholder="Describe your issue"
            className="contact-textarea"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            required
          ></textarea>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpCenter;

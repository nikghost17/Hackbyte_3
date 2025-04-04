import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Signup successful!");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">Sign Up</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="First Name" className="auth-input" required />
            <input type="text" placeholder="Last Name" className="auth-input" required />
            <input type="email" placeholder="Email" className="auth-input" required />
            <input type="tel" placeholder="Phone Number" className="auth-input" required pattern="[0-9]{10}" />
            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              required
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Re-enter Password"
              className="auth-input"
              required
              minLength="6"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="auth-button">Sign Up</button>
          </form>
          <p className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

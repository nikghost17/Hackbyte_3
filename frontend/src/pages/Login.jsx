import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", response.data.userId); // Store userId if needed

      alert("Login Successful!");
    } catch (err) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">Login</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="auth-button">
              Login
            </button>
          </form>
          <p className="auth-footer">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

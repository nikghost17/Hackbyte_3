import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import "./EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "snigdha123",
    name: "Snigdha Gupta",
    phone: "+91 9876543210",
    email: "snigdha@example.com",
    gender: "Female",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    navigate("/profile");
  };

  return (
    <div className="edit-profile-page">
      <Sidebar />
      <h1>My Profile</h1>
      <div className="edit-profile-container">
        <div className="edit-profile-card">
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit} className="edit-form">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />

            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <label>Email</label>
            <input type="email" name="email" value={formData.email} disabled />

            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>

            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

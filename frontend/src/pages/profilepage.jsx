import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaUpload, FaEye } from "react-icons/fa";
import "./profilepage.css";
import imagePlaceholder from "../assets/image.png";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img src={imagePlaceholder} alt="Profile" className="profile-pic" />
          <h2>Snigdha Gupta</h2>
          <p className="username">@snigdha123</p>
          <button className="edit-btn" onClick={() => navigate("/editprofile")}>
            <FaUserEdit /> Edit Profile
          </button>
        </div>

        <div className="profile-info">
          <p>
            <strong>Phone Number:</strong> +91 9876543210
          </p>
          <p>
            <strong>Email:</strong> snigdha@example.com
          </p>
          <p>
            <strong>Gender:</strong> Female
          </p>
        </div>

        <div className="profile-buttons">
          <button
            className="upload-btn"
            onClick={() => navigate("/uploadprescription")}
          >
            <FaUpload /> Upload Prescription
          </button>
          <button
            className="show-btn"
            onClick={() => navigate("/showprescriptions")}
          >
            <FaEye /> Show Prescriptions
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

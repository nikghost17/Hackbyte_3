import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaUpload, FaEye } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "./profilepage.css";
//import imagePlaceholder from "../assets/image.png";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, [userId, token]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          {/* <img src={imagePlaceholder} alt="Profile" className="profile-pic" /> */}
          <h2>{user.name}</h2>
          <p className="username">
            @{user.email || user.name.toLowerCase().replace(/\s/g, "")}
          </p>
          <button className="edit-btn" onClick={() => navigate("/editprofile")}>
            <FaUserEdit /> Edit Profile
          </button>
        </div>

        <div className="profile-info">
          <p>
            <strong>Phone Number:</strong> {user.phone}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender}
          </p>
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

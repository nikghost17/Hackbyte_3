import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaUpload, FaEye, FaCamera } from "react-icons/fa";
import Sidebar from "../components/sidebar";
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

  const handleImageUpload = async () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      },
      async (error, result) => {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.secure_url;
          setUser({ ...user, profilePicture: imageUrl });

          try {
            await axios.put(
              `${import.meta.env.VITE_API_URL}/users/${userId}`,
              { image: imageUrl },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } catch (err) {
            console.error("Failed to update profile picture:", err);
          }
        }
      }
    );

    widget.open();
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <Sidebar/>
      <div className="profile-card">
        <div className="profile-header">
          <div className="image-container">
            <img
              src={user.image }
              alt="Profile"
              className="profile-pic"
            />
            <button className="upload-image-btn" onClick={handleImageUpload}>
              <FaCamera />
            </button>
          </div>
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

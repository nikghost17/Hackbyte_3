import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About <span>PharmaHub</span></h1>
        <p className="about-description">
          <strong>PharmaHub</strong> is dedicated to revolutionizing 
          prescription clarity and patient empowerment. Our platform 
          simplifies medical prescriptions using AI-driven solutions 
          for seamless interpretation.
        </p>

        <div className="about-cta">
          <button className="cta-button">Explore PharmaHub</button>
        </div>
      </div>

      <div className="about-image">
        <img src="/your-image-path.png" alt="PharmaHub Concept" />
      </div>
    </div>
  );
};

export default AboutUs;

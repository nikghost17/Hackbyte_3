import React, { useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    department: "General",
    reason: "",
    patientType: "new",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Medical Appointment Form</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <label>Department</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="General">General</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Neurology">Neurology</option>
        </select>

        <label>Reason for Visit</label>
        <textarea
          name="reason"
          placeholder="Describe your reason"
          value={formData.reason}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Make an Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;

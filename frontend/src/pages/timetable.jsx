import React from "react";
import "./timetable.css"; // Import the CSS file

const Timetable = () => {
  return (
    <div className="container">
      <h2 className="title">Doctor's Timetable</h2>
      <table className="timetable">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Specialization</th>
            <th>Day</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dr. Smith</td>
            <td>Cardiologist</td>
            <td>Monday</td>
            <td>10:00 AM - 2:00 PM</td>
          </tr>
          <tr>
            <td>Dr. Johnson</td>
            <td>Dermatologist</td>
            <td>Wednesday</td>
            <td>12:00 PM - 4:00 PM</td>
          </tr>
          <tr>
            <td>Dr. Brown</td>
            <td>Pediatrician</td>
            <td>Friday</td>
            <td>9:00 AM - 1:00 PM</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;

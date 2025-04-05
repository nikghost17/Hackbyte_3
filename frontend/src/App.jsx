import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import Timetable from "./pages/timetable.jsx";
import AppointmentForm from "./pages/AppointmentForm.jsx"; // Correct import
import ProfilePage from "./pages/profilepage.jsx";
import UploadPrescription from "./pages/uploadprescription.jsx";
import EditProfile from "./pages/editprofile.jsx";
import ShowPrescriptions from "./pages/showprescriptions.jsx";
import SignIn from "./pages/Login.jsx";
import SignUp from "./pages/signup.jsx";
import AboutUs from "./pages/About_Us.jsx"

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/timetable" element={<Timetable />} />
      <Route path="/appointment" element={<AppointmentForm />} />
      <Route path="/profilepage" element={<ProfilePage />} />
      <Route path="/uploadprescription" element={<UploadPrescription />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/showprescriptions" element={<ShowPrescriptions />} />
      <Route path="/aboutus" element={<AboutUs />} />

    </Routes>
  );
}

export default App;

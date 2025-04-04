import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import Timetable from "./pages/timetable.jsx";
import FeedbackForm from "./pages/feedbackform.jsx";
 import SignUp from "./pages/signup.jsx";
 import Login from "./pages/Login.jsx";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/timetable" element={<Timetable />} />
      <Route path="/feedbackform" element={<FeedbackForm />} />
    </Routes>
  );
}

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import Timetable from "./pages/timetable.jsx";
import FeedbackForm from "./pages/feedbackform.jsx";
import FeedbackForm from "./pages/feedbackform.jsx";
// import SignIn from "./pages/signin.jsx";
// import SignUp from "./pages/login.jsx";

function App() {
  return (
    <Routes>
      {/* <Route path="/signup" element={<SignUp />} /> */}
      {/* <Route path="/login" element={<SignIn />} /> */}
      {/* <Route path="/signin" element={<SignIn />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/timetable" element={<Timetable />} />
      <Route path="/feedbackform" element={<FeedbackForm />} />
    </Routes>
  );
}

export default App;

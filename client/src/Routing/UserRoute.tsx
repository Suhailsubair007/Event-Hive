import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "@/pages/User/AuthPages/Login";
import Signup from "@/pages/User/AuthPages/Signup";
import PreferencesPage from "@/pages/User/AuthPages/Preference";
import Landing from "@/pages/User/Landing/Landing";
import MainLanding from "@/pages/User/Landing/MainLanding";

const UserRoute: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/preference" element={<PreferencesPage />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </>
  );
};

export default UserRoute;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "@/pages/User/AuthPages/Login";
import Signup from "@/pages/User/AuthPages/Signup";

const UserRoute: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default UserRoute;

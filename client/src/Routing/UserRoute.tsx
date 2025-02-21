import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "@/pages/User/AuthPages/Login";
import Signup from "@/pages/User/AuthPages/Signup";
import PreferencesPage from "@/pages/User/AuthPages/Preference";
import Landing from "@/pages/User/Landing/Landing";
import MainLanding from "@/pages/User/Landing/MainLanding";
import ProtectUserLogin from "./protected/User/ProtectUserLogin";
import UserPrivate from "./protected/User/UserPrivate";
const UserRoute: React.FC = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectUserLogin>
              <MainLanding />
            </ProtectUserLogin>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectUserLogin>
              <Login />
            </ProtectUserLogin>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectUserLogin>
              <Signup />
            </ProtectUserLogin>
          }
        />
        <Route path="/preference" element={<PreferencesPage />} />
        <Route
          path="/landing"
          element={
            <UserPrivate>
              <Landing />
            </UserPrivate>
          }
        />
      </Routes>
    </>
  );
};

export default UserRoute;

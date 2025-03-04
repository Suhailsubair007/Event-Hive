import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "@/pages/User/AuthPages/Login";
import Signup from "@/pages/User/AuthPages/Signup";
import PreferencesPage from "@/pages/User/AuthPages/Preference";
import Landing from "@/pages/User/Landing/Landing";
import MainLanding from "@/pages/User/Landing/MainLanding";
import ProtectUserLogin from "./protected/User/ProtectUserLogin";
import UserPrivate from "./protected/User/UserPrivate";
import ProfilePage from "@/pages/User/UserProfile/ProfilePage";
import ProfileUpdate from "@/ReusableComponents/UserProfileComponets/ProfileUpdate";
import GrandHostPromo from "@/ReusableComponents/UserProfileComponets/GrandHost";
import Event from "@/pages/User/UserProfile/Event";
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
        <Route
          path="/preference"
          element={
            <UserPrivate>
              <PreferencesPage />
            </UserPrivate>
          }
        />
        <Route
          path="/landing"
          element={
            <UserPrivate>
              <Landing />
            </UserPrivate>
          }
        />

        {/* Profile Section with Nested Routes */}
        <Route path="/profile" element={<ProfilePage />}>
          <Route path="update" element={<ProfileUpdate />} />
          <Route path="premium" element={<GrandHostPromo />} />
          <Route path="event" element={<Event />} />
        </Route>
      </Routes>
    </>
  );
};

export default UserRoute;

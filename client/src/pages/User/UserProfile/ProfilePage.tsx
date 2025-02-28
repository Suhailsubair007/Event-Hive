import { Outlet } from "react-router-dom";

import UserSideBar from "@/ReusableComponents/UserProfileComponets/UserSideBar";

const ProfilePage = () => {
  return (
    <>
      <div className="flex h-screen">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <UserSideBar />
        </div>
        <main className="flex-grow overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default ProfilePage;

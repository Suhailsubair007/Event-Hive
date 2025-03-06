
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/Store";

interface UserPrivateProps {
  children: ReactNode;
}

const UserPrivate: React.FC<UserPrivateProps> = ({ children }) => {
  const userData = useSelector((state: RootState) => state.user.userInfo);

  if (!userData || userData.role !== "user") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default UserPrivate;

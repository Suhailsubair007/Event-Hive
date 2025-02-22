import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../../redux/Store";

interface ProtectUserLoginProps {
  children: ReactNode;
}

const UserPrivate: React.FC<ProtectUserLoginProps> = ({ children }) => {
  const userData = useSelector((state: RootState) => state.user.userInfo);

  if (userData) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default UserPrivate;

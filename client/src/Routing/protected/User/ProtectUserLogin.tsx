import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../../redux/Store";

interface ProtectUserLoginProps {
  children: ReactNode;
}

const ProtectUserLogin: React.FC<ProtectUserLoginProps> = ({ children }) => {
  const userData = useSelector((state: RootState) => state.user.userInfo);

  if (userData) {
    return <Navigate to={userData.hasCompletedPreferences ? "/landing" : "/preference"} />;
  }

  return <>{children}</>;
};

export default ProtectUserLogin;

import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/Store";

interface ProtectUserLoginProps {
  children: ReactNode;
}

const ProtectUserLogin: React.FC<ProtectUserLoginProps> = ({ children }) => {
  const userData = useSelector((state: RootState) => state.user.userInfo);
  
  console.log("ProtectUserLogin -> userData", userData);

  if (userData === null) {
    return <>{children}</>;
  }

  if (userData?.hasCompletedPreferences === false) {
    return <Navigate to="/preference" />;
  }

  if (userData?.hasCompletedPreferences) {
    return <Navigate to="/landing" />;
  }

  return <>{children}</>;
};

export default ProtectUserLogin;

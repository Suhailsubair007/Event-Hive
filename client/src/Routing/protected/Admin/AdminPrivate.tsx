import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/Store";

interface AdminPrivateProps {
  children: ReactNode;
}

const AdminPrivate: React.FC<AdminPrivateProps> = ({ children }) => {
  const userData = useSelector((state: RootState) => state.user.userInfo);

  if (!userData || userData.role !== "admin") {
    return <Navigate to="/admin-login" />;
  }

  return <>{children}</>;
};

export default AdminPrivate;

import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/Store";

interface AdminLoginProtectProps {
  children: ReactNode;
}

const AdminLoginProtect: React.FC<AdminLoginProtectProps> = ({ children }) => {
  const adminData = useSelector((state: RootState) => state.admin.adminInfo);

  if (adminData) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default AdminLoginProtect;
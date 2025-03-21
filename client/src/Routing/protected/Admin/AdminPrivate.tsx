import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/Store";

interface AdminPrivateProps {
  children: ReactNode;
}

const AdminPrivate: React.FC<AdminPrivateProps> = ({ children }) => {
  const adminData = useSelector((state: RootState) => state.admin.adminInfo);

  if (!adminData) {
    return <Navigate to="/admin/login" />;
  }

  return <>{children}</>;
};

export default AdminPrivate;
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "@/pages/Admin/Auth/AdminLogin";
import Dashboard from "@/ReusableComponents/AdminDashboardComponents/Dashboard";
import AdminLayout from "@/pages/Admin/Main/AdminLayout";

const AdminRoute: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />

        <Route path="/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="users" element={<Users />} /> */}
          {/* <Route path="category" element={<Category />} /> */}
          {/* <Route path="events" element={<Events />} /> */}
          {/* <Route path="transaction" element={<Transaction />} /> */}
          {/* <Route path="" element={<Navigate to="dashboard" replace />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoute;

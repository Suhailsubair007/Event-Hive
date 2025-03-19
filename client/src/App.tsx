import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import UserRoute from "./Routing/UserRoute";
import AdminRoute from "./Routing/AdminRoute";

const App: React.FC = () => {
  return <AppLayout />;
};

function AppLayout() {
  return (
    <Router>
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route path="/*" element={<UserRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>
    </Router>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import Sidebar from "../../../ReusableComponents/AdminDashboardComponents/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="container p-6">
            <Outlet />
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

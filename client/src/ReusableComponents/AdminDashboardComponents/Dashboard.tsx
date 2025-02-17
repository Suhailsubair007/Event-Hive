import { Users, Calendar, Wallet, BookOpen } from "lucide-react";
import { StatsCard } from "../../ReusableComponents/AdminDashboardComponents/StatusCard";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Clients" value="500+" icon={Users} />
        <StatsCard title="Total Bookings" value="100+" icon={BookOpen} />
        <StatsCard title="Active Events" value="56" icon={Calendar} />
        <StatsCard title="Total Revenue" value="100+" icon={Wallet} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 p-6">
          <h3 className="text-lg font-medium mb-4">Weekly Revenue</h3>
          {/* Add your chart component here */}
        </Card>

        <Card className="col-span-3 p-6">
          <h3 className="text-lg font-medium mb-4">Traffic Overview</h3>
          {/* Add your chart component here */}
        </Card>
      </div>
    </div>
  );
}

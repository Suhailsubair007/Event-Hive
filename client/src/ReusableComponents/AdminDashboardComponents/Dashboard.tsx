import { Users, Calendar, Wallet, BookOpen, ArrowUp } from "lucide-react";
import { StatsCard } from "../../ReusableComponents/AdminDashboardComponents/StatusCard";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell } from "recharts";

export default function Dashboard() {
  // Weekly revenue data
  const weeklyRevenueData = [
    { day: '17', revenue1: 30, revenue2: 20, revenue3: 10 },
    { day: '18', revenue1: 25, revenue2: 18, revenue3: 12 },
    { day: '19', revenue1: 20, revenue2: 15, revenue3: 10 },
    { day: '20', revenue1: 28, revenue2: 22, revenue3: 14 },
    { day: '21', revenue1: 22, revenue2: 18, revenue3: 12 },
    { day: '22', revenue1: 25, revenue2: 20, revenue3: 15 },
    { day: '23', revenue1: 27, revenue2: 21, revenue3: 16 },
    { day: '24', revenue1: 24, revenue2: 19, revenue3: 14 },
    { day: '25', revenue1: 26, revenue2: 21, revenue3: 15 },
  ];

  // Pie chart data
  const pieData = [
    { name: 'Your files', value: 63, color: '#8257E6' },
    { name: 'System', value: 25, color: '#67E8F9' },
  ];

  // Traffic data
  const trafficData = [
    { hour: '00', visitors: 85 },
    { hour: '04', visitors: 70 },
    { hour: '08', visitors: 120 },
    { hour: '12', visitors: 85 },
    { hour: '14', visitors: 95 },
    { hour: '16', visitors: 125 },
    { hour: '18', visitors: 60 },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
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
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyRevenueData} barSize={35} barGap={1}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <Bar dataKey="revenue1" stackId="a" fill="#F0F1F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue2" stackId="a" fill="#67E8F9" radius={[0, 0, 0, 0]} />
                <Bar dataKey="revenue3" stackId="a" fill="#8257E6" radius={[0, 0, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="md:col-span-3 p-6 grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-medium mb-2">Your Pie Chart</h3>
            <div className="text-sm text-gray-500">
              <span className="inline-block">Monthly</span>
              <span className="ml-1 inline-block">▼</span>
            </div>
            <div className="h-40 relative">
              <PieChart width={150} height={150}>
                <Pie
                  data={pieData}
                  cx={75}
                  cy={75}
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                  <span className="text-xs">Your files</span>
                  <span className="ml-1 text-xs font-bold">63%</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-cyan-400 mr-2"></span>
                  <span className="text-xs">System</span>
                  <span className="ml-1 text-xs font-bold">25%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Daily Traffic</h3>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>+2.45%</span>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-3xl font-bold">2,579</div>
              <div className="text-sm text-gray-500">Visitors</div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData} barSize={12}>
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} />
                  <Bar dataKey="visitors" fill="#8257E6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
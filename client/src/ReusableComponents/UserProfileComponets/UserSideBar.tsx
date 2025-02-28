import type React from "react"
import { User, Calendar, Wallet, Users, UserIcon as UserGroup, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  icon: React.ElementType
  href: string
  active?: boolean
}

type NavSection = {
  title: string
  items: NavItem[]
}

interface SidebarProps {
  className?: string
  onNavigate?: (href: string) => void
}

const UserSideBar: React.FC<SidebarProps> = ({ className, onNavigate = () => {} }) => {
  const navSections: NavSection[] = [
    {
      title: "OVERVIEW",
      items: [
        { label: "Profile", icon: User, href: "/profile", active: true },
        { label: "Bookings", icon: Calendar, href: "/bookings" },
        { label: "Wallet", icon: Wallet, href: "/wallet" },
        { label: "Hosted Events", icon: Users, href: "/hosted-events" },
        { label: "Group", icon: UserGroup, href: "/group" },
      ],
    },
    {
      title: "SETTINGS",
      items: [
        { label: "Settings", icon: Settings, href: "/settings" },
        { label: "Logout", icon: LogOut, href: "/logout" },
      ],
    },
  ]

  const handleNavClick = (href: string) => {
    onNavigate(href)
  }

  return (
    <div className={cn("w-64 h-screen border-r border-gray-100 p-6 flex flex-col", className)}>
      <div className="flex items-center mb-10">
        <h1 className="text-xl font-bold">
          Event <span className="text-[#7848F4]">Hive</span>
        </h1>
      </div>

      <div className="flex-1">
        {navSections.map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-xs font-semibold text-gray-500 mb-4">{section.title}</h2>
            <nav className="space-y-2">
              {section.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    item.active ? "text-[#7848F4]" : "text-gray-600 hover:text-[#7848F4] hover:bg-gray-50",
                  )}
                >
                  <item.icon size={18} className={item.active ? "text-[#7848F4]" : "text-gray-500"} />
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserSideBar


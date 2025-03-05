import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  Wallet,
  Users,
  UserIcon as UserGroup,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/userSlice";

// Updated NavItem type to include optional active property
type NavItem = {
  label: string;
  icon: React.ElementType;
  href: string;
  active?: boolean; // Added this line
};

type NavSection = {
  title: string;
  items: NavItem[];
};

interface SidebarProps {
  className?: string;
  onNavigate?: (href: string) => void;
}

const UserSideBar: React.FC<SidebarProps> = ({
  className,
  onNavigate = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navSections: NavSection[] = [
    {
      title: "OVERVIEW",
      items: [
        { label: "Profile", icon: User, href: "/profile/update", active: true },
        { label: "Bookings", icon: Calendar, href: "/bookings" },
        { label: "Wallet", icon: Wallet, href: "/wallet" },
        { label: "Hosted Events", icon: Users, href: "/profile/premium" },
        { label: "Group", icon: UserGroup, href: "/group" },
      ],
    },
  ];

  const settingsSection: NavSection = {
    title: "SETTINGS",
    items: [
      { label: "Settings", icon: Settings, href: "/settings" },
      { label: "Logout", icon: LogOut, href: "/logout" },
    ],
  };

  const handleNavClick = (href: string) => {
    if (href === "/logout") {
      handleLogout();
    } else {
      navigate(href);
      onNavigate(href);
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logoutUser());
    navigate("/");
    setIsOpen(false);
    onNavigate("/");
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#7848F4] text-white p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      <div
        className={cn(
          "fixed md:static inset-y-0 left-0 w-64 bg-white h-screen border-r border-gray-200 p-6 flex flex-col transition-transform",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          className
        )}
      >
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-xl font-bold">
            Event <span className="text-[#7848F4]">Hive</span>
          </h1>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
        </div>

        <div className="flex-1">
          {navSections.map((section) => (
            <div key={section.title} className="mb-8">
              <h2 className="text-xs font-semibold text-gray-500 mb-4">
                {section.title}
              </h2>
              <nav className="space-y-2">
                {section.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                      item.active
                        ? "text-[#7848F4]"
                        : "text-gray-600 hover:text-[#7848F4] hover:bg-gray-50"
                    )}
                  >
                    <item.icon
                      size={18}
                      className={
                        item.active ? "text-[#7848F4]" : "text-gray-500"
                      }
                    />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <h2 className="text-xs font-semibold text-gray-500 mb-4">
            {settingsSection.title}
          </h2>
          <nav className="space-y-2">
            {settingsSection.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  item.active
                    ? "text-[#7848F4]"
                    : "text-gray-600 hover:text-[#7848F4] hover:bg-gray-50"
                )}
              >
                <item.icon
                  size={18}
                  className={item.active ? "text-[#7848F4]" : "text-gray-500"}
                />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default UserSideBar;
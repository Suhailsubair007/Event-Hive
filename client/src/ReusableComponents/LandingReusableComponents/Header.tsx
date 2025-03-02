import {
  Menu,
  Search,
  User,
  MapPin,
  LogOut,
  Calendar,
  User as UserIcon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { logoutUser } from "@/redux/userSlice";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLocationName } from "../../utils/getLocationName";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.user?.userInfo);
  const latitude = useSelector((state: any) => state?.user?.userInfo?.location?.latitude);

  const longitude = useSelector(
    (state: any) => state?.user?.userInfo?.location?.longitude
  );
  console.log(latitude, "latitude");
  console.log(longitude, "longitude");
  console.log(user, "user");
  const [locationName, setLocationName] = useState<string>("Fetching...");

  useEffect(() => {
    if (latitude && longitude) {
      getLocationName(latitude, longitude).then(setLocationName);
    }
  }, [latitude, longitude]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-xl font-bold">
            Event <span className="text-[#7848F4]">Hive</span>
          </h1>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-[#7848F4]">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-[#7848F4]">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-[#7848F4]">
              Contact us
            </a>
          </nav>

          {/* Right-side Icons */}
          <div className="flex items-center space-x-4">
            {/* Show Location Only If User Exists */}
            {user && (
              <div className="flex items-center text-gray-700">
                <MapPin className="h-5 w-5 text-[#7848F4] mr-1" />
                <span className="text-sm font-medium">{locationName.split(' ')[0]}</span>
              </div>
            )}

            {/* Search Button */}
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5 text-gray-600" />
            </Button>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => handleNavigate("/profile/update")}
                >
                  <UserIcon className="h-4 w-4 mr-2 text-[#7848F4]" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate("/bookings")}>
                  <Calendar className="h-4 w-4 mr-2 text-[#7848F4]" />
                  My Bookings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2 text-red-500" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

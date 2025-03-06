import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/Store";

interface PremiumRouteProps {
  children: ReactNode;
}

const PremiumRoute: React.FC<PremiumRouteProps> = ({ children }) => {
  const userData = useSelector((state: RootState) => state.user.userInfo);

  // First check if user exists and is a regular user
  if (!userData || userData.role !== "user") {
    return <Navigate to="/" />;
  }

  // Then check premium status
  if (!userData.isPremium) {
    // If not premium, redirect to premium promo page
    return <Navigate to="/profile/premium" />;
  }

  // User is premium, allow access to the premium route
  return <>{children}</>;
};

export default PremiumRoute;
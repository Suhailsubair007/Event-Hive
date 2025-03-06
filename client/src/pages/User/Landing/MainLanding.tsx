import Header from "@/ReusableComponents/LandingReusableComponents/Header";
import Footer from "@/ReusableComponents/LandingReusableComponents/Footer";
import { FeaturesSection } from "@/ReusableComponents/LandingReusableComponents/Featured";
import { MainHero } from "@/ReusableComponents/LandingReusableComponents/MainHeroSection";
import { TeamSection } from "@/ReusableComponents/LandingReusableComponents/Teams";

const MainLanding = () => {
  const heroImage1 = "https://res.cloudinary.com/dupo7yv88/image/upload/v1741209578/pexels-marc-schulte-656598-2952834_sijhcd.jpg";
  const heroImage2 = "https://res.cloudinary.com/dupo7yv88/image/upload/v1741209578/pexels-joshsorenson-976866_abaqna.jpg";
  const featureImage1 = "https://res.cloudinary.com/dupo7yv88/image/upload/v1739121646/yzbv7qtndn1tzxge3a81.svg";
  const featureImage2 = "https://res.cloudinary.com/dupo7yv88/image/upload/v1741209575/pexels-olly-787961_xknmai.jpg";
  const teamMembers = [
    { id: 1, name: "Jane Cooper", role: "Event Director", image: "https://res.cloudinary.com/dupo7yv88/image/upload/v1741211555/pexels-caleboquendo-3023317_dotkn3.jpg" },
    { id: 2, name: "John Doe", role: "Ticket Manager", image: "https://res.cloudinary.com/dupo7yv88/image/upload/v1741211554/pexels-mark-angelo-sampan-738078-1587927_j1uze7.jpg" },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <Header />
      <MainHero heroImage1={heroImage1} heroImage2={heroImage2} />
      <FeaturesSection featureImage1={featureImage1} featureImage2={featureImage2} />
      <TeamSection teamMembers={teamMembers} />
      <Footer />
    </div>
  );
};

export default MainLanding
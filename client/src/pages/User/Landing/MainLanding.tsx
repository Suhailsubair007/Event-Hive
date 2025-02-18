import Header from "@/ReusableComponents/LandingReusableComponents/Header";
import Footer from "@/ReusableComponents/LandingReusableComponents/Footer";
import { FeaturesSection } from "@/ReusableComponents/LandingReusableComponents/Featured";
import { MainHero } from "@/ReusableComponents/LandingReusableComponents/MainHeroSection";
import { TeamSection } from "@/ReusableComponents/LandingReusableComponents/Teams";

const MainLanding = () => {
  // Replace these with your Cloudinary image URLs
  const heroImage =
    "https://res.cloudinary.com/dupo7yv88/image/upload/v1739121652/j7pvzchdwhlyrn2ffxed.jpg";
  const featureImage =
    "https://res.cloudinary.com/dupo7yv88/image/upload/v1739121648/ybx2wreaahnxx8zetdhx.jpg";
  const teamMembers = [
    {
      id: 1,
      name: "Jane Cooper",
      role: "Event Director",
      image:
        "https://res.cloudinary.com/dupo7yv88/image/upload/v1732515955/8ed0705c55574e61e2d81345c131c500458c7154_ghpoyc.avif",
    },
    // Add more team members...
  ];

  return (
    <div className="bg-white">
      <Header />
      <MainHero heroImage={heroImage} />
      <FeaturesSection featureImage={featureImage} />
      <TeamSection teamMembers={teamMembers} />
      <Footer />
    </div>
  );
};

export default MainLanding;
